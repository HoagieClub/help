'use client';

import { Byline, ExpandableText, HeartButton, Stack } from '@/components/ui';
import { useHeart } from '@/hooks/useHeart';
import { formatTimePassed } from '@/lib/format';
import type { Comment } from '@/types';

export type CommentItemProps = {
	comment: Comment;
};

/**
 * One comment under an answer: who wrote it, the text and its heart.
 *
 * @example
 * <CommentItem comment={comment} />
 */
export function CommentItem({ comment }: CommentItemProps) {
	const heart = useHeart({ kind: 'comment', id: comment.id, initialCount: comment.hearts });

	return (
		<Stack gap='2'>
			<Byline
				name={comment.user.name || 'Unknown user'}
				anonymous={comment.isAnonymous}
				meta={formatTimePassed(comment.createdAt)}
			/>
			<ExpandableText text={comment.text} />
			<div>
				<HeartButton {...heart} thing='comment' />
			</div>
		</Stack>
	);
}
