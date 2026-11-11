import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
	[
		'inline-flex shrink-0 items-center justify-center rounded-pill',
		'border border-line bg-surface font-body text-muted select-none',
	],
	{
		variants: {
			size: {
				/** 32px: compact lists. */
				sm: 'h-8 w-8 text-small',
				/** 40px: answers and comments. */
				md: 'h-10 w-10 text-body-sm',
				/** 80px: the question author. */
				lg: 'h-20 w-20 text-h2 font-normal',
				/** 112px: a profile page. */
				xl: 'h-28 w-28 text-h1 font-normal',
			},
		},
		defaultVariants: { size: 'md' },
	}
);

export type AvatarProps = VariantProps<typeof avatarVariants> & {
	/** Full name; the avatar shows its initials. */
	name: string;
	/** Shows "?" instead of initials. */
	anonymous?: boolean;
};

function initials(name: string) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const letters =
		parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? '?')[0];
	return (letters ?? '?').toUpperCase();
}

/**
 * A circle with someone's initials.
 *
 * @example
 * <Avatar name='Alex Chen' size='lg' />
 * <Avatar name='Anonymous' anonymous />
 */
export function Avatar({ name, size, anonymous = false }: AvatarProps) {
	return (
		<span role='img' aria-label={name} className={cn(avatarVariants({ size }))}>
			<span aria-hidden='true'>{anonymous ? '?' : initials(name)}</span>
		</span>
	);
}
