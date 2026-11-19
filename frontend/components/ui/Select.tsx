import { useId, type SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import { describedBy, fieldVariants } from './field';
import { FieldShell } from './FieldShell';

export type SelectOption = { value: string; label: string };

export type SelectProps = Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	'className' | 'style' | 'id' | 'children' | 'multiple'
> & {
	label: string;
	hideLabel?: boolean;
	options: SelectOption[];
	/** Shown as the first, empty choice. */
	placeholder?: string;
	hint?: string;
	error?: string;
	id?: string;
};

/**
 * A labeled dropdown with the same look and states as Input.
 *
 * @example
 * <Select
 *   label='Category'
 *   placeholder='Select a category'
 *   options={[{ value: 'cs', label: 'Computer Science' }]}
 *   value={category}
 *   onChange={(e) => setCategory(e.target.value)}
 * />
 */
export function Select({
	label,
	hideLabel,
	options,
	placeholder,
	hint,
	error,
	id,
	...props
}: SelectProps) {
	const generatedId = useId();
	const selectId = id ?? generatedId;

	return (
		<FieldShell id={selectId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
			<select
				id={selectId}
				aria-invalid={error ? true : undefined}
				aria-describedby={describedBy(selectId, hint, error)}
				className={cn(fieldVariants({ invalid: Boolean(error) }), 'h-10 px-3')}
				{...props}
			>
				{placeholder && <option value=''>{placeholder}</option>}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</FieldShell>
	);
}
