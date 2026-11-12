import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tagVariants = cva(
	'inline-flex h-6 items-center rounded-tag px-2 font-body text-small whitespace-nowrap',
	{
		variants: {
			variant: {
				/** A course code, like COS 226. */
				course: 'bg-brand text-surface',
				/** A topic tag, like "exam prep". */
				topic: 'bg-neutral text-ink',
				/** A category badge, like "Algorithms" on a study group. */
				category: 'bg-success text-surface',
			},
		},
		defaultVariants: { variant: 'topic' },
	}
);

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'style' | 'color'> &
	VariantProps<typeof tagVariants> & {
		children: ReactNode;
	};

/**
 * A small rounded label for courses, topics and categories. Not clickable; for filters use
 * FilterGroup.
 *
 * @example
 * <Tag variant='course'>COS 226</Tag>
 * <Tag>exam prep</Tag>
 */
export function Tag({ variant, children, ...props }: TagProps) {
	return (
		<span className={cn(tagVariants({ variant }))} {...props}>
			{children}
		</span>
	);
}
