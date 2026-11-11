import type { ReactNode } from 'react';

import { Text } from './Text';

export type FieldShellProps = {
	id: string;
	label: string;
	/** Keep the label for screen readers but don't show it. */
	hideLabel?: boolean;
	hint?: string;
	error?: string;
	children: ReactNode;
};

/**
 * Label, hint and error around a form control. Internal to components/ui
 * (Input, Textarea and Select use it); pages use those components instead.
 */
export function FieldShell({ id, label, hideLabel, hint, error, children }: FieldShellProps) {
	return (
		<div className='flex flex-col gap-1'>
			{hideLabel ? (
				<label htmlFor={id} className='sr-only'>
					{label}
				</label>
			) : (
				<Text as='label' variant='label' htmlFor={id}>
					{label}
				</Text>
			)}
			{children}
			{hint && (
				<Text as='span' variant='small' tone='muted' id={`${id}-hint`}>
					{hint}
				</Text>
			)}
			{error && (
				<Text as='span' variant='small' tone='danger' id={`${id}-error`} role='alert'>
					{error}
				</Text>
			)}
		</div>
	);
}
