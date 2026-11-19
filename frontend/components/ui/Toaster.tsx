'use client';

import type { ComponentProps } from 'react';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

export type ToasterProps = ComponentProps<typeof Sonner>;

/**
 * Shows toast messages. It's mounted once in app/layout.tsx; to show one, call `toast` from
 * 'sonner'. For messages that should stay on the page, use Message instead.
 *
 * @example
 * import { toast } from 'sonner';
 *
 * toast.success('Answer posted.');
 */
export function Toaster(props: ToasterProps) {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			toastOptions={{
				classNames: {
					toast: 'rounded-card border border-line bg-surface font-body text-ink shadow-dropdown',
					description: 'text-muted',
					actionButton: 'bg-brand text-surface',
					cancelButton: 'bg-surface-gray text-muted',
				},
			}}
			{...props}
		/>
	);
}
