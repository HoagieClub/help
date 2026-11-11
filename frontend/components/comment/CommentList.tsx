import { Stack } from '@/components/ui';
import type { Comment } from '@/types';

import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

export type CommentListProps = {
	comments: Comment[];
	answerId: string;
};

/**
 * All comments on one answer, followed by the "Add a comment" form.
 *
 * @example
 * <CommentList comments={answer.comments} answerId={String(answer.id)} />
 */
export function CommentList({ comments, answerId }: CommentListProps) {
	return (
		<Stack gap='4'>
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} />
			))}
			<CommentForm answerId={answerId} />
		</Stack>
	);
}
