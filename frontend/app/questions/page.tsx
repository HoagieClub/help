'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { getAllQuestions } from '@/api/questionService';
import { QuestionCard } from '@/components/question/QuestionCard';
import {
	Button,
	EmptyState,
	FilterGroup,
	Message,
	PageHeader,
	Spinner,
	Stack,
} from '@/components/ui';
import { formatTimePassed } from '@/lib/format';

type Question = NonNullable<Awaited<ReturnType<typeof getAllQuestions>>>[number];
type Sort = 'recent' | 'popular';

const SORTS: { value: Sort; label: string }[] = [
	{ value: 'recent', label: 'Recent' },
	{ value: 'popular', label: 'Popular' },
];

export default function QAPage() {
	const [questions, setQuestions] = useState<Question[] | null | undefined>(undefined);
	// TODO: the sort doesn't change the list yet.
	const [sort, setSort] = useState<Sort>('recent');

	useEffect(() => {
		void (async () => {
			setQuestions(await getAllQuestions());
		})();
	}, []);

	return (
		<div className='mx-auto max-w-3xl px-4 py-8'>
			<Stack gap='6'>
				<PageHeader
					title='Q&A'
					description='Ask questions, share knowledge, help classmates'
					action={
						<Button variant='success' asChild>
							<Link href='/questions/ask'>Ask Question</Link>
						</Button>
					}
				/>
				<FilterGroup label='Sort questions' options={SORTS} value={sort} onChange={setSort} />

				{questions === undefined && <Spinner label='Loading questions…' />}
				{questions === null && (
					<Message variant='error'>
						Couldn’t load questions. Please refresh to try again.
					</Message>
				)}
				{questions?.length === 0 && (
					<EmptyState title='No questions found' description='Be the first to ask!' />
				)}
				{questions && questions.length > 0 && (
					<Stack gap='4'>
						{questions.map((q) => (
							<QuestionCard
								key={q.id}
								title={q.title}
								meta={[
									q.user_is_anonymous ? 'Anonymous' : `User ${q.user}`,
									formatTimePassed(q.create_time),
								]}
								course={q.course}
								views={q.view}
								href={`/questions/${q.id}`}
							/>
						))}
					</Stack>
				)}
			</Stack>
		</div>
	);
}
