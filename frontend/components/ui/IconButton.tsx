import type { ButtonHTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { LucideIcon } from 'lucide-react';

const iconButtonVariants = cva(
	[
		'inline-flex shrink-0 items-center justify-center rounded-md cursor-pointer transition-colors',
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
		'disabled:pointer-events-none disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				minimal: 'bg-transparent text-muted hover:bg-brand-tint hover:text-brand',
				secondary: 'border border-control-border bg-surface text-ink hover:bg-surface-gray',
			},
			size: {
				sm: 'h-8 w-8',
				md: 'h-10 w-10',
			},
		},
		defaultVariants: { variant: 'minimal', size: 'md' },
	}
);

export type IconButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'className' | 'style' | 'children' | 'aria-label'
> &
	VariantProps<typeof iconButtonVariants> & {
		/** A lucide icon component, e.g. `Calendar`. */
		icon: LucideIcon;
		/** What the button does. Screen readers read it, since there's no visible text. */
		label: string;
	};

/**
 * A square button with only an icon.
 *
 * @example
 * import { Calendar } from 'lucide-react';
 *
 * <IconButton icon={Calendar} label='Pick a date' onClick={openPicker} />
 * <IconButton icon={Calendar} label='Pick a date' variant='secondary' size='sm' />
 */
export function IconButton({ icon: Icon, label, variant, size, type, ...props }: IconButtonProps) {
	return (
		<button
			type={type ?? 'button'}
			aria-label={label}
			title={label}
			className={cn(iconButtonVariants({ variant, size }))}
			{...props}
		>
			<Icon aria-hidden='true' className={size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} />
		</button>
	);
}
