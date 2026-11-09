import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('m-0 font-heading', {
	variants: {
		/** Type style from the brand kit (all Poppins 600). */
		variant: {
			display: 'text-display',
			h1: 'text-h1',
			h2: 'text-h2',
			h3: 'text-h3',
		},
		/** brand uses brand-bright, which the brand kit allows only at 24px and up. */
		tone: {
			heading: 'text-heading',
			ink: 'text-ink',
			brand: 'text-brand-bright',
		},
	},
	compoundVariants: [{ variant: 'h3', tone: 'brand', className: 'text-brand' }],
	defaultVariants: { variant: 'h2', tone: 'heading' },
});

type HeadingVariant = NonNullable<VariantProps<typeof headingVariants>['variant']>;

const DEFAULT_TAG: Record<HeadingVariant, 'h1' | 'h2' | 'h3'> = {
	display: 'h1',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
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
 * Titles and section headings. Use one `h1` per page.
 *
 * @example
 * <Heading variant='h1'>Study Groups</Heading>
 * <Heading variant='h3' as='h2'>Upcoming</Heading>
 *
 * See every variant on /design.
 */
export function Heading({ variant, tone, as, children, ...props }: HeadingProps) {
	const Tag = as ?? DEFAULT_TAG[variant ?? 'h2'];
	return (
		<Tag className={cn(headingVariants({ variant, tone }))} {...props}>
			{children}
		</Tag>
	);
}

export default Heading;
