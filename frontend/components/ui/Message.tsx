import type { ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const messageVariants = cva('flex w-full items-start gap-2 rounded-md px-4 py-3', {
	variants: {
		variant: {
			success: 'bg-success-soft text-success',
			error: 'bg-danger-soft text-danger',
			warning: 'bg-warning-soft text-warning',
		},
	},
	defaultVariants: { variant: 'success' },
});

type MessageVariant = NonNullable<VariantProps<typeof messageVariants>['variant']>;

const ICON: Record<MessageVariant, string> = { success: '✓', error: '!', warning: '!' };

export type MessageProps = VariantProps<typeof messageVariants> & {
	/** The message. Write it so it makes sense without the color or icon. */
	children: ReactNode;
};

/**
 * Inline status banner for the result of an action.
 * Errors are announced right away (role="alert"); success and warning politely (role="status").
 *
 * @example
 * <Message variant='success'>Answer posted.</Message>
 * <Message variant='error'>Couldn't post your answer. Check your connection and try again.</Message>
 * <Message variant='warning'>This question is from last semester.</Message>
 */
export function Message({ variant, children }: MessageProps) {
	const v = variant ?? 'success';
	return (
		<div
			role={v === 'error' ? 'alert' : 'status'}
			className={cn(messageVariants({ variant: v }))}
		>
			<span aria-hidden='true' className='font-body text-label font-bold'>
				{ICON[v]}
			</span>
			<span className='min-w-0 font-body text-body-sm'>{children}</span>
		</div>
	);
}
