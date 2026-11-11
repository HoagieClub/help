import { Fragment, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const metaRowVariants = cva('m-0 flex flex-wrap items-center gap-2 font-body', {
	variants: {
		size: {
			sm: 'text-small',
			md: 'text-body-sm',
			lg: 'text-body',
		},
		tone: {
			muted: 'text-muted',
			default: 'text-ink',
		},
	},
	defaultVariants: { size: 'md', tone: 'muted' },
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
 * <MetaRow items={[name, formatTimePassed(createdAt)]} size='lg' tone='default' />
 */
export function MetaRow({ items, size, tone }: MetaRowProps) {
	const shown = items.filter((item) => item !== null && item !== false && item !== '');
	return (
		<p className={cn(metaRowVariants({ size, tone }))}>
			{shown.map((item, index) => (
				<Fragment key={index}>
					{index > 0 && <span aria-hidden='true'>•</span>}
					<span>{item}</span>
				</Fragment>
			))}
		</p>
	);
}
