'use client';

import { CommentList } from '@/components/comment/CommentList';
import { Byline, ExpandableText, HeartButton, Stack } from '@/components/ui';
import { useHeart } from '@/hooks/useHeart';
import { formatTimePassed } from '@/lib/format';
import type { Answer } from '@/types';

export type AnswerItemProps = {
	answer: Answer;
};

/**
 * One answer: who wrote it, the text, its heart and its comment thread.
 *
 * @example
 * <AnswerItem answer={answer} />
 */
export function AnswerItem({ answer }: AnswerItemProps) {
	const heart = useHeart({ kind: 'answer', id: answer.id, initialCount: answer.hearts });

	return (
		<article className='border-b border-line-neutral py-6'>
			<Stack gap='3'>
				<Byline
					name={answer.user.name || 'Unknown user'}
					anonymous={answer.isAnonymous}
					meta={formatTimePassed(answer.createdAt)}
				/>
				<ExpandableText text={answer.text} limit={400} />
				<div>
					<HeartButton {...heart} thing='answer' />
				</div>
				<div className='ml-4 border-l-2 border-line-neutral pl-6'>
					<CommentList comments={answer.comments} answerId={String(answer.id)} />
				</div>
			</Stack>
		</article>
	);
}
