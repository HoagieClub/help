import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Text } from './Text';

export type SpinnerProps = {
	size?: 'sm' | 'md';
	/** Shown next to the spinner and read by screen readers. */
	label?: string;
};

/**
 * Loading indicator.
 *
 * @example
 * <Spinner />
 * <Spinner size='sm' label='Posting…' />
 */
export function Spinner({ size = 'md', label = 'Loading…' }: SpinnerProps) {
	return (
		<div role='status' className='inline-flex items-center gap-2'>
			<LoaderCircle
				aria-hidden='true'
				className={cn('animate-spin text-brand', size === 'sm' ? 'h-4 w-4' : 'h-6 w-6')}
			/>
			<Text as='span' variant={size === 'sm' ? 'small' : 'body'} tone='muted'>
				{label}
			</Text>
		</div>
	);
}
