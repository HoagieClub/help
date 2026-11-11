'use client';

import { Button } from './Button';

export type FilterOption<T extends string> = { value: T; label: string };

export type FilterGroupProps<T extends string> = {
	options: FilterOption<T>[];
	value: T;
	onChange: (value: T) => void;
	/** Names the group for screen readers, e.g. "Filter questions". */
	label: string;
};

/**
 * A row of filter buttons where one is on: "All Questions / Popular / Unanswered".
 * The selected one is red, the rest are ghost buttons.
 *
 * @example
 * <FilterGroup
 *   label='Filter questions'
 *   options={[{ value: 'all', label: 'All Questions' }, { value: 'popular', label: 'Popular' }]}
 *   value={filter}
 *   onChange={setFilter}
 * />
 */
export function FilterGroup<T extends string>({
	options,
	value,
	onChange,
	label,
}: FilterGroupProps<T>) {
	return (
		<div role='group' aria-label={label} className='flex flex-wrap gap-2'>
			{options.map((option) => {
				const selected = option.value === value;
				return (
					<Button
						key={option.value}
						size='sm'
						variant={selected ? 'primary' : 'ghost'}
						aria-pressed={selected}
						onClick={() => onChange(option.value)}
					>
						{option.label}
					</Button>
				);
			})}
		</div>
	);
}
