import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('m-0', {
	variants: {
		/** Type style from the brand kit. */
		variant: {
			lead: 'font-body text-lead',
			'body-lg': 'font-body text-body-lg',
			body: 'font-body text-body',
			label: 'font-body text-label',
			small: 'font-body text-small',
			caption: 'font-body text-caption',
			eyebrow: 'font-mono text-eyebrow',
			code: 'font-mono text-code',
		},
		/** Text color. mascot-mint and mascot-orange are fills only, so they aren't options. */
		tone: {
			default: 'text-ink',
			muted: 'text-muted',
			brand: 'text-brand',
			success: 'text-success',
			warning: 'text-warning',
			danger: 'text-danger',
			inverse: 'text-surface',
		},
	},
	defaultVariants: { variant: 'body', tone: 'default' },
});

type TextElement = 'p' | 'span' | 'div' | 'label' | 'code';

export type TextProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style' | 'color'> &
	VariantProps<typeof textVariants> & {
		/** HTML element to render. Defaults to `p`. */
		as?: TextElement;
		/** For `as='label'`: the id of the input this label belongs to. */
		htmlFor?: string;
		children: ReactNode;
	};

/**
 * Any text you read: paragraphs, labels, timestamps, captions.
 * Sizes and colors come from the brand kit; there's no way to pass your own.
 *
 * @example
 * <Text>Ask questions and help classmates.</Text>
 * <Text variant='small' tone='muted'>3 hrs ago</Text>
 * <Text as='span' variant='eyebrow' tone='brand'>STUDY GROUP</Text>
 *
 * See every variant on /design.
 */
export function Text({ as: Tag = 'p', variant, tone, children, ...props }: TextProps) {
	return (
		<Tag className={cn(textVariants({ variant, tone }))} {...props}>
			{children}
		</Tag>
	);
}
