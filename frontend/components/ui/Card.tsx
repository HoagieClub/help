import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const cardVariants = cva('rounded-card border border-line bg-surface shadow-card', {
	variants: {
		/** Inner spacing from the spacing scale. */
		padding: {
			sm: 'p-4',
			md: 'p-6',
		},
		/** interactive adds the hover shadow, for cards that link somewhere. */
		interactive: {
			true: 'cursor-pointer transition-shadow hover:shadow-card-hover',
			false: '',
		},
	},
	defaultVariants: { padding: 'md', interactive: false },
});

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> &
	VariantProps<typeof cardVariants> & {
		as?: 'div' | 'article' | 'section' | 'li';
		children: ReactNode;
	};

/**
 * A white box with a light border: question cards, the Ask a Question form, study groups.
 *
 * @example
 * <Card>
 *   <Heading variant='title'>COS 226 Study Group</Heading>
 *   <Text variant='body-sm' tone='muted'>Mar 28, 2025 · 6:00 PM</Text>
 * </Card>
 */
export function Card({ as: Tag = 'div', padding, interactive, children, ...props }: CardProps) {
	return (
		<Tag className={cn(cardVariants({ padding, interactive }))} {...props}>
			{children}
		</Tag>
	);
}
