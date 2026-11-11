import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('m-0 font-body text-ink', {
	variants: {
		variant: {
			/** 30px bold: page titles (Q&A, Ask a Question, a profile name). */
			h1: 'text-h1',
			/** 24px semibold: the question title on the question page. */
			h2: 'text-h2',
			/** 20px bold: the author name on the question page. */
			h3: 'text-h3',
			/** 16px semibold: card titles, "2 Answers". */
			title: 'text-title',
		},
	},
	defaultVariants: { variant: 'h2' },
});

type HeadingVariant = NonNullable<VariantProps<typeof headingVariants>['variant']>;

const DEFAULT_TAG: Record<HeadingVariant, 'h1' | 'h2' | 'h3'> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	title: 'h3',
};

export type HeadingProps = Omit<
	HTMLAttributes<HTMLHeadingElement>,
	'className' | 'style' | 'color'
> &
	VariantProps<typeof headingVariants> & {
		/** Override the HTML tag when the visual size and the page outline differ. */
		as?: 'h1' | 'h2' | 'h3' | 'h4';
		children: ReactNode;
	};

/**
 * Titles and headings, in the four sizes the designs use.
 *
 * @example
 * <Heading variant='h1'>Q&amp;A</Heading>
 * <Heading variant='title' as='h2'>2 Answers</Heading>
 */
export function Heading({ variant, as, children, ...props }: HeadingProps) {
	const Tag = as ?? DEFAULT_TAG[variant ?? 'h2'];
	return (
		<Tag className={cn(headingVariants({ variant }))} {...props}>
			{children}
		</Tag>
	);
}
