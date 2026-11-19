import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const stackVariants = cva('flex', {
	variants: {
		direction: {
			column: 'flex-col',
			row: 'flex-row',
		},
		/** Space between children, from the spacing scale (4 = 16px). */
		gap: {
			'0': 'gap-0',
			'1': 'gap-1',
			'2': 'gap-2',
			'3': 'gap-3',
			'4': 'gap-4',
			'5': 'gap-5',
			'6': 'gap-6',
			'8': 'gap-8',
			'10': 'gap-10',
			'15': 'gap-15',
		},
		align: {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			stretch: 'items-stretch',
			baseline: 'items-baseline',
		},
		justify: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
		},
		wrap: {
			true: 'flex-wrap',
			false: 'flex-nowrap',
		},
	},
	defaultVariants: {
		direction: 'column',
		gap: '4',
		align: 'stretch',
		justify: 'start',
		wrap: false,
	},
});

export type StackProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> &
	VariantProps<typeof stackVariants> & {
		as?: 'div' | 'section' | 'ul' | 'ol' | 'li' | 'form' | 'nav' | 'header' | 'footer';
		children: ReactNode;
	};

/**
 * Lays children out in a row or column with a gap from the spacing scale.
 * Use it instead of margins between siblings.
 *
 * @example
 * <Stack gap='4'>
 *   <Heading variant='h1'>Q&A</Heading>
 *   <Text tone='muted'>Ask questions, help classmates</Text>
 * </Stack>
 *
 * <Stack direction='row' gap='2' align='center' wrap>
 *   <Tag>COS 226</Tag>
 *   <Tag>python</Tag>
 * </Stack>
 */
export function Stack({
	as: Tag = 'div',
	direction,
	gap,
	align,
	justify,
	wrap,
	children,
	...props
}: StackProps) {
	return (
		<Tag className={cn(stackVariants({ direction, gap, align, justify, wrap }))} {...props}>
			{children}
		</Tag>
	);
}
