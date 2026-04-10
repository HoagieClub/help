'use client';

import { useEffect, useState } from 'react';

import { Heading, Pane, Spinner, Text, majorScale } from 'evergreen-ui';
import { useParams } from 'next/navigation';

import { getAllAnswers } from '@/api/answerService';
import { getAllComments } from '@/api/commentService';
import { getQuestionDetails } from '@/api/questionService';
import AnswerPanel from '@/components/answer/AnswerPanel';
import QuestionPanel from '@/components/question/QuestionPanel';
import type { Answer, Comment } from '@/types';

type ApiAnswer = NonNullable<Awaited<ReturnType<typeof getAllAnswers>>>[number];
type ApiComment = NonNullable<Awaited<ReturnType<typeof getAllComments>>>[number];
type LoadedQuestion = NonNullable<Awaited<ReturnType<typeof getQuestionDetails>>>;

function mapApiCommentToUi(api: ApiComment): Comment {
	return {
		id: api.id,
		answer: api.answer,
		user: { name: `User ${api.user}` },
		text: api.text,
		hearts: api.hearts,
		isAnonymous: api.is_anonymous,
		createdAt: api.created_at,
		updatedAt: api.updated_at,
	};
}

async function mapApiAnswerToUi(api: ApiAnswer): Promise<Answer> {
	const rawComments = await getAllComments(String(api.id));
	const comments = (rawComments ?? []).map(mapApiCommentToUi);

	return {
		id: api.id,
		question: api.question,
		user: { name: `User ${api.user}` },
		text: api.text,
		hearts: api.hearts,
		isAnonymous: api.is_anonymous,
		createdAt: api.created_at,
		updatedAt: api.updated_at,
		comments,
	};
}

function QuestionPage() {
	const params = useParams<{ id: string }>();
	const questionId = params.id;

	const [question, setQuestion] = useState<LoadedQuestion | null | undefined>(undefined);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [loadError, setLoadError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			if (!questionId) {
				setQuestion(null);
				setAnswers([]);
				return;
			}

			setLoadError(null);
			setQuestion(undefined);

			const q = await getQuestionDetails(questionId);
			if (cancelled) return;

			if (!q) {
				setQuestion(null);
				setAnswers([]);
				setLoadError('Question not found or could not be loaded.');
				return;
			}

			setQuestion(q);

			const rawAnswers = await getAllAnswers(questionId);
			if (cancelled) return;

			const list = rawAnswers ?? [];
			const mapped = await Promise.all(list.map((a) => mapApiAnswerToUi(a)));
			if (cancelled) return;

			setAnswers(mapped);
		}

		void load();

		return () => {
			cancelled = true;
		};
	}, [questionId]);

	if (question === undefined) {
		return (
			<Pane
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				minHeight={320}
				marginX='auto'
				padding={majorScale(2)}
			>
				<Spinner size={48} />
				<Text marginTop={majorScale(2)} size={400} color='muted'>
					Loading question…
				</Text>
			</Pane>
		);
	}

	if (question === null) {
		return (
			<Pane marginX='auto' padding={majorScale(2)} marginTop={majorScale(8)}>
				<Heading size={700} marginBottom={majorScale(2)}>
					Question unavailable
				</Heading>
				<Text size={500} color='muted'>
					{loadError ?? 'We could not load this question.'}
				</Text>
			</Pane>
		);
	}

	return (
		<Pane
			padding={majorScale(2)}
			marginLeft={majorScale(16)}
			marginTop={majorScale(8)}
			marginRight={majorScale(16)}
		>
			<QuestionPanel
				questionId={questionId}
				user={`User ${question.user}`}
				title={question.title}
				tags={question.tags.map(String)}
				course={question.course}
				details={question.details}
				create_time={question.create_time}
				user_is_anonymous={question.user_is_anonymous}
				hearts={question.hearts}
			/>
			<Pane marginTop={majorScale(6)} maxWidth='700px' marginX='auto'>
				<AnswerPanel answers={answers} />
			</Pane>
		</Pane>
	);
}

export default QuestionPage;
