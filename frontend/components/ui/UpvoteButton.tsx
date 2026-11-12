import { Triangle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './Button';

export type UpvoteButtonProps = {
	/** Whether the viewer has upvoted this. */
	upvoted: boolean;
	count: number;
	onToggle: () => void;
	/** True while the request is in flight; the button can't be pressed twice. */
	pending?: boolean;
	/** What is being upvoted, for screen readers, e.g. "answer". */
	thing?: string;
};

/**
 * "▲ Upvote (12)" under a question, answer or comment. Get the props from useUpvote.
 *
 * @example
 * const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
 * <UpvoteButton {...upvote} thing='answer' />
 */
export function UpvoteButton({
	upvoted,
	count,
	onToggle,
	pending = false,
	thing = 'post',
}: UpvoteButtonProps) {
	return (
		<button
			type='button'
			onClick={onToggle}
			disabled={pending}
			aria-pressed={upvoted}
			aria-label={`${upvoted ? 'Remove upvote from' : 'Upvote'} this ${thing}, ${count} ${count === 1 ? 'upvote' : 'upvotes'}`}
			className={cn(
				buttonVariants({ variant: 'link', size: 'inline' }),
				'disabled:pointer-events-auto disabled:cursor-wait disabled:opacity-100',
				upvoted && 'text-brand hover:text-brand-hover'
			)}
		>
			<Triangle aria-hidden='true' className='h-3 w-3 fill-current' />
			<span aria-hidden='true'>Upvote ({count})</span>
		</button>
	);
}
