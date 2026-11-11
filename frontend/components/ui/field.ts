import { cva } from 'class-variance-authority';

/**
 * Shared look for text fields (Input, Textarea, Select) so every form control matches.
 * Internal to components/ui; pages use the components, not these classes.
 */
export const fieldVariants = cva(
	[
		'w-full rounded-md border bg-surface font-body text-body text-ink',
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

/** ids for a field's hint and error, and the aria-describedby that ties them to the field. */
export function describedBy(id: string, hint?: string, error?: string) {
	const ids = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean);
	return ids.length ? ids.join(' ') : undefined;
}
