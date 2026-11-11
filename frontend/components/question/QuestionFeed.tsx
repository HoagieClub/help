'use client';

import { useMemo, useState } from 'react';

import { Search } from 'lucide-react';
import Link from 'next/link';

import { Button, EmptyState, FilterGroup, Input, Stack } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchQuestions } from '@/hooks/useSearchQuestions';

import { QuestionCard, type QuestionCardProps } from './QuestionCard';

type Filter = 'all' | 'popular';

// TODO: Figma also has "Unanswered". Add it once the questions API sends an answer count.
const FILTERS: { value: Filter; label: string }[] = [
	{ value: 'all', label: 'All Questions' },
	{ value: 'popular', label: 'Popular' },
];

export type QuestionFeedItem = QuestionCardProps & { id: number };

export type QuestionFeedProps = {
	questions: QuestionFeedItem[];
};

/**
 * The body of the Q&A page: search box, Ask Question, filters and the list of questions.
 *
 * @example
 * <QuestionFeed questions={cards} />
 */
export function QuestionFeed({ questions }: QuestionFeedProps) {
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState<Filter>('all');
	const debouncedQuery = useDebounce(query, 200);
	const matches = useSearchQuestions(questions, debouncedQuery);

	const shown = useMemo(
		() =>
			filter === 'popular' ? [...matches].sort((a, b) => b.upvotes - a.upvotes) : matches,
		[matches, filter]
	);

	return (
		<Stack gap='6'>
			<Stack gap='4'>
				<Stack direction='row' gap='6' align='center'>
					<div className='min-w-0 flex-1'>
						<Input
							label='Search Q&A'
							hideLabel
							type='search'
							variant='search'
							icon={Search}
							placeholder='Search Q&A'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<Button variant='success' asChild>
						<Link href='/questions/ask'>Ask Question</Link>
					</Button>
				</Stack>
				<FilterGroup
					label='Filter questions'
					options={FILTERS}
					value={filter}
					onChange={setFilter}
				/>
			</Stack>

			{shown.length === 0 ? (
				<EmptyState
					title={debouncedQuery ? `No results for “${debouncedQuery}”` : 'No questions yet'}
					description={debouncedQuery ? undefined : 'Be the first to ask!'}
				/>
			) : (
				<Stack gap='6'>
					{shown.map(({ id, ...card }) => (
						<QuestionCard key={id} {...card} href={`/questions/${id}`} />
					))}
				</Stack>
			)}
		</Stack>
	);
}
