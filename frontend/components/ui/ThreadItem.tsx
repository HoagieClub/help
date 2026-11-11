import type { ReactNode } from 'react';

import { Avatar } from './Avatar';

export type ThreadItemProps = {
	/** Display name. Shown as "Anonymous" when `anonymous` is true. */
	name: string;
	anonymous?: boolean;
	/** Usually the time, e.g. "45m ago". */
	meta?: string;
	/** The post itself, usually ExpandableText. */
	children: ReactNode;
	/** Buttons under the post, e.g. UpvoteButton and Reply. */
	actions?: ReactNode;
	/** Nested posts (comments under an answer). A line connects them to the avatar. */
	replies?: ReactNode;
};

/**
 * One post in a thread: avatar on the left, name and time, the text, actions, then replies.
 * Answers and comments both use it, so they always look the same.
 *
 * @example
 * <ThreadItem
 *   name='Shannon Huang'
 *   meta='45m ago'
 *   actions={<UpvoteButton {...upvote} thing='answer' />}
 *   replies={<CommentList comments={answer.comments} answerId={answer.id} />}
 * >
 *   <ExpandableText text={answer.text} />
 * </ThreadItem>
 */
export function ThreadItem({
	name,
	anonymous = false,
	meta,
	children,
	actions,
	replies,
}: ThreadItemProps) {
	const displayName = anonymous ? 'Anonymous' : name;

	return (
		<div className='flex gap-3'>
			<div className='flex flex-col items-center gap-2'>
				<Avatar name={displayName} anonymous={anonymous} size='md' />
				{replies && <div aria-hidden='true' className='w-px flex-1 bg-line' />}
			</div>
			<div className='flex min-w-0 flex-1 flex-col gap-2 pt-1'>
				<div className='flex flex-col'>
					<span className='font-body text-label font-bold text-ink'>{displayName}</span>
					{meta && <span className='font-body text-small text-ink'>{meta}</span>}
				</div>
				{children}
				{actions && <div className='flex items-center gap-4'>{actions}</div>}
				{replies && <div className='flex flex-col gap-4 pt-2'>{replies}</div>}
			</div>
		</div>
	);
}
