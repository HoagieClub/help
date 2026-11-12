'use client';

import { ExpandableText, ThreadItem, UpvoteButton } from '@/components/ui';
import { useUpvote } from '@/hooks/useUpvote';
import { formatTimePassed } from '@/lib/format';
import type { Comment } from '@/types';

export type CommentItemProps = {
	comment: Comment;
};

/**
 * One comment under an answer: who wrote it, the text and its upvote.
 *
 * This is the worked example in DESIGN_SYSTEM.md: a feature component built only from
 * components/ui pieces and a hook, with no styling of its own.
 *
 * @example
 * <CommentItem comment={comment} />
 */
export function CommentItem({ comment }: CommentItemProps) {
	const upvote = useUpvote({ kind: 'comment', id: comment.id, initialCount: comment.hearts });

	return (
		<ThreadItem
			name={comment.user.name || 'Unknown user'}
			anonymous={comment.isAnonymous}
			meta={formatTimePassed(comment.createdAt)}
			actions={<UpvoteButton {...upvote} thing='comment' />}
		>
			<ExpandableText text={comment.text} limit={200} />
		</ThreadItem>
	);
}
