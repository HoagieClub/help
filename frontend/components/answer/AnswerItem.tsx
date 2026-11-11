'use client';

import { CommentList } from '@/components/comment/CommentList';
import { ExpandableText, ThreadItem, UpvoteButton } from '@/components/ui';
import { useUpvote } from '@/hooks/useUpvote';
import { formatTimePassed } from '@/lib/format';
import type { Answer } from '@/types';

export type AnswerItemProps = {
	answer: Answer;
};

/**
 * One answer: who wrote it, the text, its upvote, and its comments underneath.
 *
 * @example
 * <AnswerItem answer={answer} />
 */
export function AnswerItem({ answer }: AnswerItemProps) {
	const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });

	return (
		<ThreadItem
			name={answer.user.name || 'Unknown user'}
			anonymous={answer.isAnonymous}
			meta={formatTimePassed(answer.createdAt)}
			actions={<UpvoteButton {...upvote} thing='answer' />}
			replies={<CommentList comments={answer.comments} answerId={String(answer.id)} />}
		>
			<ExpandableText text={answer.text} limit={2000} />
		</ThreadItem>
	);
}
