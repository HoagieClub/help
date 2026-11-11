'use client';

import { useMemo } from 'react';

import type { QuestionCardProps } from '@/components/question/QuestionCard';

/**
 * Filters question cards by a search query (title, course, preview and meta, case-insensitive).
 *
 * @example
 * const results = useSearchQuestions(questions, debouncedQuery);
 */
export function useSearchQuestions<T extends QuestionCardProps>(
	questions: T[],
	query: string
): T[] {
	return useMemo(() => {
		const q = query.toLowerCase().trim();
		if (!q) {
			return questions;
		}
		return questions.filter((question) =>
			[question.title, question.course ?? '', question.preview, question.meta].some((field) =>
				field.toLowerCase().includes(q)
			)
		);
	}, [questions, query]);
}
