import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-card border border-line bg-surface', {
	variants: {
		/** Inner spacing from the spacing scale. */
		padding: {
			sm: 'p-4',
			md: 'p-6',
			lg: 'p-8',
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
 * A white box with the brand border and 20px corners. Put content inside a Stack.
 *
 * @example
 * <Card>
 *   <Stack gap='2'>
 *     <Heading variant='h3'>COS 226 Midterm Review</Heading>
 *     <Text tone='muted'>Thursday, 7pm</Text>
 *   </Stack>
 * </Card>
 *
 * <Card as='article' interactive padding='sm'>…</Card>
 */
export function Card({ as: Tag = 'div', padding, interactive, children, ...props }: CardProps) {
	return (
		<Tag className={cn(cardVariants({ padding, interactive }))} {...props}>
			{children}
		</Tag>
	);
}
