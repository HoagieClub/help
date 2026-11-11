import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

export type HeartButtonProps = {
	/** Whether the viewer has hearted this. */
	hearted: boolean;
	count: number;
	onToggle: () => void;
	/** True while the request is in flight; the button can't be pressed twice. */
	pending?: boolean;
	/** What is being hearted, for screen readers, e.g. "answer". */
	thing?: string;
};

/**
 * Heart toggle with its count. Hearted shows a filled brand heart and bold count,
 * not hearted an outline heart in muted gray, so the state never relies on color alone.
 * Pair it with the useHeart hook, which handles the request and rollback.
 *
 * @example
 * const heart = useHeart({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
 * <HeartButton {...heart} thing='answer' />
 */
export function HeartButton({
	hearted,
	count,
	onToggle,
	pending = false,
	thing = 'post',
}: HeartButtonProps) {
	return (
		<button
			type='button'
			onClick={onToggle}
			disabled={pending}
			aria-pressed={hearted}
			aria-label={`${hearted ? 'Remove heart from' : 'Heart'} this ${thing}, ${count} ${count === 1 ? 'heart' : 'hearts'}`}
			className={cn(
				'inline-flex cursor-pointer items-center gap-1 rounded-sm px-1 font-body text-small transition-colors',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
				'disabled:cursor-wait',
				hearted ? 'font-semibold text-brand' : 'text-muted hover:text-brand'
			)}
		>
			<Heart aria-hidden='true' className={cn('h-4 w-4', hearted && 'fill-current')} />
			<span aria-hidden='true'>{count}</span>
		</button>
	);
}
