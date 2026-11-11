'use client';

import { useState } from 'react';

import { heartAnswer, heartComment, heartQuestion } from '@/api/heartService';

export type UpvoteKind = 'question' | 'answer' | 'comment';

/** The backend calls upvotes "hearts"; the designs call them upvotes. */
const TOGGLE: Record<UpvoteKind, (id: string) => ReturnType<typeof heartQuestion>> = {
	question: heartQuestion,
	answer: heartAnswer,
	comment: heartComment,
};

export type UseUpvoteOptions = {
	kind: UpvoteKind;
	id: string | number;
	/** The current count (`hearts` in the API). */
	initialCount: number;
	/** The API doesn't return this on GET yet, so it defaults to false. */
	initialUpvoted?: boolean;
};

/**
 * Upvote or un-upvote a question, answer or comment.
 * Updates the count right away, then uses the server's answer, or rolls back if the request fails.
 *
 * @example
 * const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
 * <UpvoteButton {...upvote} thing='answer' />
 */
export function useUpvote({ kind, id, initialCount, initialUpvoted = false }: UseUpvoteOptions) {
	const [upvoted, setUpvoted] = useState(initialUpvoted);
	const [count, setCount] = useState(initialCount);
	const [pending, setPending] = useState(false);

	async function onToggle() {
		if (pending) {
			return;
		}
		const before = { upvoted, count };
		setUpvoted(!upvoted);
		setCount(upvoted ? count - 1 : count + 1);
		setPending(true);

		const result = await TOGGLE[kind](String(id));
		if (result) {
			setUpvoted(result.is_hearted);
			setCount(result.hearts);
		} else {
			setUpvoted(before.upvoted);
			setCount(before.count);
		}
		setPending(false);
	}

	return { upvoted, count, pending, onToggle };
}
