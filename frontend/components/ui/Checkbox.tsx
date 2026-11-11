import { useId, type InputHTMLAttributes } from 'react';

import { Text } from './Text';

export type CheckboxProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'className' | 'style' | 'type' | 'id' | 'size'
> & {
	/** Text next to the box. Clicking it toggles the box. */
	label: string;
	id?: string;
};

/**
 * A checkbox with its label.
 *
 * @example
 * <Checkbox
 *   label='Post anonymously'
 *   checked={anonymous}
 *   onChange={(e) => setAnonymous(e.target.checked)}
 * />
 */
export function Checkbox({ label, id, ...props }: CheckboxProps) {
	const generatedId = useId();
	const boxId = id ?? generatedId;

	return (
		<div className='flex items-center gap-2'>
			<input
				id={boxId}
				type='checkbox'
				className='h-4 w-4 cursor-pointer rounded-sm border-control-border text-brand focus:ring-2 focus:ring-brand-soft disabled:cursor-not-allowed disabled:opacity-50'
				{...props}
			/>
			<Text as='label' htmlFor={boxId}>
				{label}
			</Text>
		</div>
	);
}
