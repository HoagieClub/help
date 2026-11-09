import { useId, type InputHTMLAttributes } from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Text } from './Text';

const inputVariants = cva(
	[
		'h-10 w-full rounded-md border bg-surface px-3 font-body text-body text-ink',
		'placeholder:text-placeholder',
		'focus:outline-none focus:ring-2',
		'disabled:cursor-not-allowed disabled:bg-surface-gray disabled:opacity-50',
	],
	{
		variants: {
			invalid: {
				false: 'border-control-border focus:border-focus focus:ring-brand-soft',
				true: 'border-danger focus:border-danger focus:ring-danger-soft',
			},
		},
		defaultVariants: { invalid: false },
	}
);

export type InputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'className' | 'style' | 'size' | 'type' | 'id'
> & {
	/** Visible label above the field. Required so every input is accessible. */
	label: string;
	type?: 'text' | 'email' | 'search' | 'number' | 'date' | 'time' | 'url' | 'password' | 'tel';
	/** Helper text under the field. */
	hint?: string;
	/** Error message. When set, the field turns red and screen readers announce the message. */
	error?: string;
	/** Optional id; one is generated if you leave it out. */
	id?: string;
};

/**
 * A labeled text field with optional hint and error message.
 *
 * @example
 * <Input label='Question title' name='title' placeholder='e.g. How do I…' required />
 * <Input label='Course' hint='Optional' />
 * <Input label='Max participants' type='number' error='Must be at least 2' />
 *
 * See every state on /design.
 */
export function Input({ label, type = 'text', hint, error, id, ...props }: InputProps) {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const hintId = `${inputId}-hint`;
	const errorId = `${inputId}-error`;
	const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

	return (
		<div className={cn('flex flex-col gap-1')}>
			<Text as='label' variant='label' htmlFor={inputId}>
				{label}
			</Text>
			<input
				id={inputId}
				type={type}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy || undefined}
				className={cn(inputVariants({ invalid: Boolean(error) }))}
				{...props}
			/>
			{hint && (
				<Text as='span' variant='small' tone='muted' id={hintId}>
					{hint}
				</Text>
			)}
			{error && (
				<Text as='span' variant='small' tone='danger' id={errorId} role='alert'>
					{error}
				</Text>
			)}
		</div>
	);
}

export default Input;
