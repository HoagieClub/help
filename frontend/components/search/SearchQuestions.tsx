'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { QuestionCard, type QuestionCardProps } from '@/components/question/QuestionCard';
import { EmptyState, Input, Stack } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchQuestions } from '@/hooks/useSearchQuestions';

export type SearchQuestionsProps = {
	questions: (QuestionCardProps & { id: string | number })[];
};

/**
 * A search box over a list of questions; results update as you type. Not on a page yet.
 *
 * @example
 * <SearchQuestions questions={cards} />
 */
export function SearchQuestions({ questions }: SearchQuestionsProps) {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 200);
	const results = useSearchQuestions(questions, debouncedQuery);

	return (
		<Stack gap='4'>
			<Input
				label='Search questions'
				hideLabel
				type='search'
				variant='search'
				icon={Search}
				placeholder='Search Q&A'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			{results.length === 0 ? (
				<EmptyState title={`No results for “${debouncedQuery}”`} />
			) : (
				<Stack gap='4'>
					{results.map(({ id, ...card }) => (
						<QuestionCard key={id} {...card} />
					))}
				</Stack>
			)}
		</Stack>
	);
}
