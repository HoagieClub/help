import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
	'inline-flex shrink-0 items-center justify-center rounded-pill font-body select-none',
	{
		variants: {
			size: {
				sm: 'h-8 w-8 text-small',
				md: 'h-10 w-10 text-label',
				lg: 'h-15 w-15 text-h3',
			},
			anonymous: {
				false: 'bg-line text-heading',
				true: 'bg-surface-gray text-muted',
			},
		},
		defaultVariants: { size: 'sm', anonymous: false },
	}
);

export type AvatarProps = VariantProps<typeof avatarVariants> & {
	/** Full name; the avatar shows its initials. */
	name: string;
};

function initials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const letters =
		parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? '?')[0];
	return (letters ?? '?').toUpperCase();
}

/**
 * Round initials badge for a person. Use `anonymous` for anonymous posts.
 *
 * @example
 * <Avatar name='Ava Fonss' />
 * <Avatar name='Anonymous' anonymous size='md' />
 */
export function Avatar({ name, size, anonymous }: AvatarProps) {
	return (
		<span role='img' aria-label={name} className={cn(avatarVariants({ size, anonymous }))}>
			<span aria-hidden='true'>{anonymous ? '?' : initials(name)}</span>
		</span>
	);
}
