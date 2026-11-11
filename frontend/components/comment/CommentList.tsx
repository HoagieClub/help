import type { Comment } from '@/types';

import { CommentItem } from './CommentItem';

export type CommentListProps = {
	comments: Comment[];
	/** Called when someone presses Reply on a comment. Opens the answer's comment box. */
	onReply: () => void;
};

/**
 * The comments under one answer.
 *
 * @example
 * <CommentList comments={answer.comments} onReply={() => setIsReplying(true)} />
 */
export function CommentList({ comments, onReply }: CommentListProps) {
	return (
		<>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} onReply={onReply} />
			))}
		</>
	);
}
