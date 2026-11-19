import { useId, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { describedBy, fieldVariants } from './field';
import { FieldShell } from './FieldShell';

export type TextareaProps = Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	'className' | 'style' | 'id'
> & {
	label: string;
	hideLabel?: boolean;
	hint?: string;
	error?: string;
	id?: string;
};

/**
 * A labeled multi-line text field. Same states as Input.
 *
 * @example
 * <Textarea label='Details' rows={6} placeholder='Add details…' required />
 * <Textarea label='Write a comment' hideLabel rows={3} placeholder='Write a comment…' />
 */
export function Textarea({ label, hideLabel, hint, error, id, rows = 4, ...props }: TextareaProps) {
	const generatedId = useId();
	const fieldId = id ?? generatedId;

	return (
		<FieldShell id={fieldId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
			<textarea
				id={fieldId}
				rows={rows}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy(fieldId, hint, error)}
				className={cn(fieldVariants({ invalid: Boolean(error) }), 'resize-y px-3 py-2')}
				{...props}
			/>
		</FieldShell>
	);
}
