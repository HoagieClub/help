'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { getAllAnswers } from '@/api/answerService';
import { getAllComments } from '@/api/commentService';
import { getQuestionDetails } from '@/api/questionService';
import { AnswerList } from '@/components/answer/AnswerList';
import { QuestionPanel } from '@/components/question/QuestionPanel';
import { EmptyState, Spinner, Stack } from '@/components/ui';
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
			<div className='flex justify-center px-4 py-15'>
				<Spinner label='Loading question…' />
			</div>
		);
	}

	if (question === null) {
		return (
			<EmptyState
				title='Question unavailable'
				description={loadError ?? 'We could not load this question.'}
			/>
		);
	}

	return (
		<div className='mx-auto max-w-2xl px-4 py-10'>
			<Stack gap='8'>
				<QuestionPanel
					questionId={questionId}
					// TODO: the API sends a user id, not a name.
					author={`User ${question.user}`}
					anonymous={question.user_is_anonymous}
					title={question.title}
					course={question.course}
					// TODO: the API sends tag ids, not names.
					tags={[]}
					details={question.details}
					createdAt={question.create_time}
					upvotes={question.hearts}
				/>
				<AnswerList answers={answers} />
			</Stack>
		</div>
	);
}

export default QuestionPage;
