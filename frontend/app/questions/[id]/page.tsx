'use client';

import { useEffect, useState } from 'react';
import { Pane, Spinner, majorScale } from 'evergreen-ui';
import { useParams } from 'next/navigation';

import AnswerPanel from '@/components/AnswerPanel';
import QuestionPanel from '@/components/QuestionPanel';
import { getAllAnswers } from '@/api/answerService';
import { getQuestionDetails } from '@/api/questionService';
import type { Answer } from '@/types';

/** Map API answer payload to the shape expected by AnswerPanel / AnswerBox. */
function mapApiAnswersToAnswers(
	apiAnswers: NonNullable<Awaited<ReturnType<typeof getAllAnswers>>>
): Answer[] {
	return apiAnswers.map((a) => ({
		id: a.id,
		question: a.question,
		user: { name: `User ${a.user}` },
		text: a.text,
		hearts: a.hearts,
		isAnonymous: a.is_anonymous,
		createdAt: a.created_at,
		updatedAt: a.updated_at,
		comments: [],
	}));
}

export function QuestionPage() {
	const params = useParams<{ id: string }>();
	const questionId = params.id;

	const [question, setQuestion] = useState<Awaited<ReturnType<typeof getQuestionDetails>>>(null);
	const [answers, setAnswers] = useState<Answer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!questionId) {
			setLoading(false);
			return;
		}

		async function fetchData() {
			setLoading(true);
			setError(null);

			const [questionData, answersData] = await Promise.all([
				getQuestionDetails(questionId),
				getAllAnswers(questionId),
			]);

			if (questionData === null) {
				setError('Question not found');
				setQuestion(null);
			} else {
				setQuestion(questionData);
			}
			setAnswers(answersData ? mapApiAnswersToAnswers(answersData) : []);
			setLoading(false);
		}

		fetchData();
	}, [questionId]);

	if (loading) {
		return (
			<Pane
				marginX='auto'
				padding={majorScale(2)}
				marginLeft={majorScale(16)}
				marginTop={majorScale(8)}
				marginRight={majorScale(16)}
				display='flex'
				justifyContent='center'
				alignItems='center'
				minHeight={200}
			>
				<Spinner />
			</Pane>
		);
	}

	if (error || !question) {
		return (
			<Pane
				marginX='auto'
				padding={majorScale(2)}
				marginLeft={majorScale(16)}
				marginTop={majorScale(8)}
				marginRight={majorScale(16)}
			>
				{error ?? 'Question not found'}
			</Pane>
		);
	}

	return (
		<Pane
			marginX='auto'
			padding={majorScale(2)}
			marginLeft={majorScale(16)}
			marginTop={majorScale(8)}
			marginRight={majorScale(16)}
		>
			<QuestionPanel
				title={question.title}
				details={question.details}
				tags={question.tags}
				course={question.course}
				createTime={question.create_time}
				heart={question.heart}
				view={question.view}
				userIsAnonymous={question.user_is_anonymous}
			/>
			<AnswerPanel answers={answers} />
		</Pane>
	);
}

export default QuestionPage;
