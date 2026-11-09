import type { HTMLAttributes, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tagVariants = cva(
	'inline-flex items-center gap-1 rounded-tag px-3 py-1 font-body text-small whitespace-nowrap',
	{
		variants: {
			variant: {
				/** A filter or choice that is turned on. */
				selected: 'bg-brand text-surface',
				/** A filter or choice that is turned off, or a plain topic tag. */
				idle: 'border border-line bg-surface text-ink',
				/** A course or category label, like COS 226. */
				label: 'bg-brand-soft text-brand-deep',
				success: 'bg-success-soft text-success',
				warning: 'bg-warning-soft text-warning',
			},
		},
		defaultVariants: { variant: 'idle' },
	}
);

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style' | 'color'> &
	VariantProps<typeof tagVariants> & {
		/** Render the child (for example a <button> for a clickable filter) with tag styles. */
		asChild?: boolean;
		children: ReactNode;
	};

/**
 * Small rounded label for courses, topics, filters and statuses.
 *
 * @example
 * <Tag variant='label'>COS 226</Tag>
 * <Tag>python</Tag>
 * <Tag variant='success'>Joined</Tag>
 *
 * // A clickable filter chip:
 * <Tag asChild variant={isOn ? 'selected' : 'idle'}>
 *   <button type='button' onClick={toggle}>Math</button>
 * </Tag>
 */
export function Tag({ variant, asChild = false, children, ...props }: TagProps) {
	const Comp = asChild ? Slot : 'span';
	return (
		<Comp className={cn(tagVariants({ variant }))} {...props}>
			{children}
		</Comp>
	);
}

export default Tag;
