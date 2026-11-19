import type { Comment } from '@/types';

import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

export type CommentListProps = {
	comments: Comment[];
	answerId: string;
};

/**
 * The comments under one answer, followed by the "Add a comment" box.
 *
 * @example
 * <CommentList comments={answer.comments} answerId={String(answer.id)} />
 */
export function CommentList({ comments, answerId }: CommentListProps) {
	return (
		<>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
			<CommentForm answerId={answerId} />
		</>
	);
}
