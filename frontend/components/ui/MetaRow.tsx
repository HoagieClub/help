import { Fragment, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const metaRowVariants = cva('m-0 flex flex-wrap items-center gap-2 font-body text-muted', {
	variants: {
		size: {
			sm: 'text-small',
			md: 'text-body-sm',
			lg: 'text-body',
		},
	},
	defaultVariants: { size: 'md' },
});

export type MetaRowProps = VariantProps<typeof metaRowVariants> & {
	/** The pieces to show. Empty ones (null, false, '') are skipped. */
	items: ReactNode[];
};

/**
 * Short facts separated by dots: "Sarah Park • 2h ago" or "7 posts in Q&A • Class of 2026".
 *
 * @example
 * <MetaRow items={['Q&A', '2h ago']} />
 * <MetaRow items={['7 posts in Q&A', 'Class of 2026', 'Computer Science']} size='lg' />
 */
export function MetaRow({ items, size }: MetaRowProps) {
	const shown = items.filter((item) => item !== null && item !== false && item !== '');
	return (
		<p className={cn(metaRowVariants({ size }))}>
			{shown.map((item, index) => (
				<Fragment key={index}>
					{index > 0 && <span aria-hidden='true'>•</span>}
					<span>{item}</span>
				</Fragment>
			))}
		</p>
	);
}
