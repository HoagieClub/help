import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2 rounded-md font-body text-label',
		'cursor-pointer transition-colors select-none whitespace-nowrap',
		'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
		'disabled:pointer-events-none disabled:opacity-50',
		'aria-disabled:pointer-events-none aria-disabled:opacity-50',
	],
	{
		variants: {
			variant: {
				/** The main action: Post Question, Join Group, the selected filter. */
				primary: 'bg-brand text-surface hover:bg-brand-hover',
				/** Ask Question on the Q&A page. */
				success: 'bg-success text-surface hover:opacity-90',
				/** Next to a primary button, like Cancel. */
				secondary: 'border border-line bg-surface-gray text-ink hover:bg-line',
				/** No background until hover: Back, Sign In, unselected filters. */
				ghost: 'bg-transparent text-ink hover:bg-line',
				/** Small text actions under a post: Reply, Read more. Use with size='inline'. */
				link: 'bg-transparent text-muted hover:text-ink',
				/** Deletes or removes something. */
				destructive: 'bg-danger text-surface hover:opacity-90',
			},
			size: {
				/** 36px tall: filters, Back, buttons inside cards. */
				sm: 'h-9 px-3',
				/** 40px tall (default): form buttons, the page header action. */
				md: 'h-10 px-4',
				/** No height or padding, for text actions inside a post. */
				inline: 'h-auto gap-1 rounded-sm p-0',
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
 * <Button variant='secondary'>Cancel</Button>
 * <Button variant='link' size='inline' onClick={reply}>Reply</Button>
 *
 * // A link that looks like a button (no <button> inside <a>):
 * <Button variant='success' asChild>
 *   <Link href='/questions/ask'>Ask Question</Link>
 * </Button>
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
