import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from './Button';

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
 * "♡ 12" under a question, answer or comment. Outline when not hearted, filled brand red when
 * hearted. With 0 hearts only the heart shows. Get the props from useHeart.
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
				buttonVariants({ variant: 'link', size: 'inline' }),
				'disabled:pointer-events-auto disabled:cursor-wait disabled:opacity-100',
				hearted && 'text-brand hover:text-brand-hover'
			)}
		>
			<Heart aria-hidden='true' className={cn('h-4 w-4', hearted && 'fill-current')} />
			{count > 0 && <span aria-hidden='true'>{count}</span>}
		</button>
	);
}
