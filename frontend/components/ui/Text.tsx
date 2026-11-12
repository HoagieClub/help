import type { HTMLAttributes, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('m-0 font-body', {
	variants: {
		/** Type style from app/tokens.css. */
		variant: {
			/** 16px: question and answer text, page descriptions. */
			body: 'text-body',
			/** 14px: meta rows, tabs, inputs. */
			'body-sm': 'text-body-sm',
			/** 14px medium: form labels, names. */
			label: 'text-label',
			/** 12px: tags, card previews, hints. */
			small: 'text-small',
			/** Monospace, for code samples. */
			code: 'font-mono text-code',
		},
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
 * Any text that isn't a heading.
 *
 * @example
 * <Text>I have my midterm coming up in two weeks…</Text>
 * <Text variant='body-sm' tone='muted'>2h ago</Text>
 */
export function Text({ as: Tag = 'p', variant, tone, children, ...props }: TextProps) {
	return (
		<Tag className={cn(textVariants({ variant, tone }))} {...props}>
			{children}
		</Tag>
	);
}
