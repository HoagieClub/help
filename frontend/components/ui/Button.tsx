import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2 rounded-md font-body text-label',
		'cursor-pointer transition-colors select-none',
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
		'disabled:pointer-events-none disabled:opacity-50',
		'aria-disabled:pointer-events-none aria-disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				/** The main action on a page. Use one per section. */
				primary: 'bg-brand text-surface hover:bg-brand-hover active:bg-brand-deep',
				/** Other actions, like Cancel. */
				secondary:
					'border border-control-border bg-surface text-ink hover:bg-surface-gray active:bg-line-neutral',
				/** Low-emphasis actions, like Back or Read more. */
				minimal: 'bg-transparent text-brand hover:bg-brand-tint active:bg-brand-wash',
				/** Deletes or removes something. */
				destructive: 'bg-danger text-surface hover:bg-brand-deep active:bg-brand-deep',
			},
			/** Only md exists for now (40px tall). */
			size: {
				md: 'h-10 px-4',
			},
			fullWidth: {
				true: 'w-full',
				false: '',
			},
		},
		defaultVariants: { variant: 'primary', size: 'md', fullWidth: false },
	}
);

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> &
	VariantProps<typeof buttonVariants> & {
		/**
		 * Render the child element (for example a Next.js Link) with button styles,
		 * instead of nesting a <button> inside a link.
		 */
		asChild?: boolean;
		children: ReactNode;
	};

/**
 * The one button for the whole app.
 *
 * @example
 * <Button onClick={save}>Post Question</Button>
 * <Button variant='secondary' type='button'>Cancel</Button>
 * <Button variant='destructive' disabled={isDeleting}>Delete</Button>
 *
 * // A link that looks like a button (no <button> inside <a>):
 * <Button asChild>
 *   <Link href='/questions/ask'>Ask Question</Link>
 * </Button>
 *
 * See every variant on /design.
 */
export function Button({
	variant,
	size,
	fullWidth,
	asChild = false,
	type,
	children,
	...props
}: ButtonProps) {
	const classes = cn(buttonVariants({ variant, size, fullWidth }));
	if (asChild) {
		return (
			<Slot className={classes} {...props}>
				{children}
			</Slot>
		);
	}
	return (
		<button type={type ?? 'button'} className={classes} {...props}>
			{children}
		</button>
	);
}

export default Button;
