'use client';

import { useEffect, useRef, useState } from 'react';

import { addQuestionView } from '@/api/questionService';

export type UseQuestionViewOptions = {
	questionId: string | number;
	/** The current count (`view` in the API), shown until the server answers. */
	initialCount: number;
};

/**
 * Counts one view when a question page opens, and returns the view count to show.
 * Counts once per question id, even when React runs effects twice in development.
 * If the request fails, the count stays at `initialCount`.
 *
 * @example
 * const views = useQuestionView({ questionId: question.id, initialCount: question.view });
 * <ViewCount count={views} />
 */
export function useQuestionView({ questionId, initialCount }: UseQuestionViewOptions) {
	const [count, setCount] = useState(initialCount);
	const countedId = useRef<string | null>(null);

	useEffect(() => {
		const id = String(questionId);
		if (countedId.current === id) {
			return;
		}
		countedId.current = id;
		void addQuestionView(id).then((result) => {
			if (result) {
				setCount(result.view);
			}
		});
	}, [questionId]);

	return count;
}
