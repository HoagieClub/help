'use client';

import { useHeart, type HeartKind } from './useHeart';

export type UpvoteKind = HeartKind;

export type UseUpvoteOptions = {
	kind: UpvoteKind;
	id: string | number;
	/** The current count (`hearts` in the API). */
	initialCount: number;
	/** The API doesn't return this on GET yet, so it defaults to false. */
	initialUpvoted?: boolean;
};

/**
 * Props for the older UpvoteButton. Same as useHeart, with `upvoted` instead of `hearted`.
 * New code should use useHeart with HeartButton.
 *
 * @example
 * const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
 * <UpvoteButton {...upvote} thing='answer' />
 */
export function useUpvote({ kind, id, initialCount, initialUpvoted = false }: UseUpvoteOptions) {
	const { hearted, ...rest } = useHeart({
		kind,
		id,
		initialCount,
		initialHearted: initialUpvoted,
	});
	return { upvoted: hearted, ...rest };
}
