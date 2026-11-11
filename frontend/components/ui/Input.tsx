import { useId, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { describedBy, fieldVariants } from './field';
import { FieldShell } from './FieldShell';

import type { LucideIcon } from 'lucide-react';

export type InputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'className' | 'style' | 'size' | 'type' | 'id'
> & {
	/** Label above the field. Required so every input is accessible. */
	label: string;
	/** Keep the label for screen readers but hide it, e.g. for a search box with a placeholder. */
	hideLabel?: boolean;
	type?: 'text' | 'email' | 'search' | 'number' | 'date' | 'time' | 'url' | 'password' | 'tel';
	/** Helper text under the field. */
	hint?: string;
	/** Error message. When set, the field turns red and screen readers announce it. */
	error?: string;
	/** Optional lucide icon shown inside the field on the left. */
	icon?: LucideIcon;
	/** `search` is the round white search box from the Q&A page. */
	variant?: 'default' | 'search';
	/** Optional id; one is generated if you leave it out. */
	id?: string;
};

/**
 * A labeled text field with optional hint, error and icon.
 *
 * @example
 * <Input label='Question title' name='title' placeholder='e.g. How do I…' required />
 * <Input label='Course' hint='Optional' />
 * <Input label='Max participants' type='number' error='Must be at least 2' />
 * <Input label='Search' hideLabel type='search' variant='search' icon={Search} placeholder='Search Q&A' />
 *
 * See every state on /design.
 */
export function Input({
	label,
	hideLabel,
	type = 'text',
	hint,
	error,
	icon: Icon,
	variant = 'default',
	id,
	...props
}: InputProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	const input = (
		<input
			id={inputId}
			type={type}
			aria-invalid={error ? true : undefined}
			aria-describedby={describedBy(inputId, hint, error)}
			className={cn(
				fieldVariants({ invalid: Boolean(error) }),
				'h-10 px-3',
				variant === 'search' && 'rounded-pill border-neutral bg-surface px-4',
				Icon && 'pl-10'
			)}
			{...props}
		/>
	);

	return (
		<FieldShell id={inputId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
			{Icon ? (
				<div className='relative'>
					<Icon
						aria-hidden='true'
						className='pointer-events-none absolute top-3 left-4 h-4 w-4 text-ink'
					/>
					{input}
				</div>
			) : (
				input
			)}
		</FieldShell>
	);
}
