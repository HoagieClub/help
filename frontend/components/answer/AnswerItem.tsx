'use client';

import { useState } from 'react';

import { CommentForm } from '@/components/comment/CommentForm';
import { CommentList } from '@/components/comment/CommentList';
import { Button, ExpandableText, ThreadItem, UpvoteButton } from '@/components/ui';
import { useUpvote } from '@/hooks/useUpvote';
import { formatTimePassed } from '@/lib/format';
import type { Answer } from '@/types';

export type AnswerItemProps = {
	answer: Answer;
};

/**
 * One answer: who wrote it, the text, Upvote and Reply, and its comments underneath.
 *
 * @example
 * <AnswerItem answer={answer} />
 */
export function AnswerItem({ answer }: AnswerItemProps) {
	const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
	const [isReplying, setIsReplying] = useState(false);
	const hasReplies = answer.comments.length > 0 || isReplying;

	return (
		<ThreadItem
			name={answer.user.name || 'Unknown user'}
			anonymous={answer.isAnonymous}
			meta={formatTimePassed(answer.createdAt)}
			actions={
				<>
					<UpvoteButton {...upvote} thing='answer' />
					<Button variant='link' size='inline' onClick={() => setIsReplying(true)}>
						Reply
					</Button>
				</>
			}
			replies={
				hasReplies && (
					<>
						<CommentList
							comments={answer.comments}
							onReply={() => setIsReplying(true)}
						/>
						{isReplying && (
							<CommentForm
								answerId={String(answer.id)}
								onDone={() => setIsReplying(false)}
							/>
						)}
					</>
				)
			}
		>
			<ExpandableText text={answer.text} limit={2000} />
		</ThreadItem>
	);
}
