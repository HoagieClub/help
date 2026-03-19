'use client';

import { useEffect, useState } from 'react';
import { Pane, Spinner, majorScale } from 'evergreen-ui';
import { useParams } from 'next/navigation';

import AnswerPanel from '@/components/AnswerPanel';
import QuestionPanel from '@/components/QuestionPanel';
import { getQuestionDetails } from '@/api/questionService';
import { getAnswersByQuestionId } from '@/api/answerService';

export function QuestionPage() {
	const params = useParams<{ id: string }>();
	const questionId = params.id;

	const [question, setQuestion] = useState<Awaited<ReturnType<typeof getQuestionDetails>>>(null);
	const [answers, setAnswers] = useState<Awaited<ReturnType<typeof getAnswersByQuestionId>>>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!questionId) return;

		async function fetchData() {
			setLoading(true);
			setError(null);

			const [questionData, answersData] = await Promise.all([
				getQuestionDetails(questionId),
				getAnswersByQuestionId(questionId),
			]);

			if (questionData === null) {
				setError('Question not found');
				setQuestion(null);
			} else {
				setQuestion(questionData);
			}
			setAnswers(answersData ?? []);
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
			<AnswerPanel answers={answers ?? []} />
		</Pane>
	);
}

export default QuestionPage;
