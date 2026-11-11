'use client';

import { useEffect, useState } from 'react';

import { getAllQuestions } from '@/api/questionService';
import { QuestionFeed, type QuestionFeedItem } from '@/components/question/QuestionFeed';
import { Message, PageHeader, Spinner, Stack } from '@/components/ui';
import { formatTimePassed } from '@/lib/format';

type Question = NonNullable<Awaited<ReturnType<typeof getAllQuestions>>>[number];

function toFeedItem(q: Question): QuestionFeedItem {
	return {
		id: q.id,
		title: q.title,
		preview: q.details,
		// TODO: show the asker's name once the API sends it (it only sends a user id).
		meta: [q.user_is_anonymous ? 'Anonymous' : `User ${q.user}`, formatTimePassed(q.create_time)],
		course: q.course,
		// TODO: the API sends tag ids; show tag names once there's a tags endpoint.
		tags: [],
		upvotes: q.hearts,
		views: q.view,
	};
}

export default function QAPage() {
	const [questions, setQuestions] = useState<QuestionFeedItem[] | null | undefined>(undefined);

	useEffect(() => {
		void (async () => {
			const data = await getAllQuestions();
			setQuestions(data ? data.map(toFeedItem) : null);
		})();
	}, []);

	return (
		<div className='mx-auto max-w-5xl px-4 py-8'>
			<Stack gap='6'>
				<PageHeader
					title='Q&A'
					description='Ask questions, share knowledge, help classmates'
				/>
				{questions === undefined && <Spinner label='Loading questions…' />}
				{questions === null && (
					<Message variant='error'>Couldn’t load questions. Please refresh to try again.</Message>
				)}
				{questions && <QuestionFeed questions={questions} />}
			</Stack>
		</div>
	);
}
