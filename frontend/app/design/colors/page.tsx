'use client';

import { Stack, Text } from '@/components/ui';
import { COLOR_GROUPS } from '@/lib/design-tokens';

import { PageHeader, TokenValue } from '../design-ui';

// Tailwind only generates classes it can see written in full, so swatch classes are listed literally.
const SWATCH: Record<string, string> = {
	brand: 'bg-brand',
	'brand-hover': 'bg-brand-hover',
	'brand-deep': 'bg-brand-deep',
	'brand-bright': 'bg-brand-bright',
	'brand-soft': 'bg-brand-soft',
	'brand-wash': 'bg-brand-wash',
	'brand-tint': 'bg-brand-tint',
	focus: 'bg-focus',
	ink: 'bg-ink',
	heading: 'bg-heading',
	muted: 'bg-muted',
	placeholder: 'bg-placeholder',
	surface: 'bg-surface',
	'surface-gray': 'bg-surface-gray',
	line: 'bg-line',
	'line-neutral': 'bg-line-neutral',
	'control-border': 'bg-control-border',
	success: 'bg-success',
	'success-soft': 'bg-success-soft',
	warning: 'bg-warning',
	'warning-soft': 'bg-warning-soft',
	danger: 'bg-danger',
	'danger-soft': 'bg-danger-soft',
	'club-purple': 'bg-club-purple',
	'mascot-mint': 'bg-mascot-mint',
	'mascot-orange': 'bg-mascot-orange',
};

export default function ColorsPage() {
	return (
		<Stack gap='8'>
			<PageHeader title='Colors' summary='Use as bg-brand, text-brand or var(--brand).' />
			{COLOR_GROUPS.map((group) => (
				<Stack key={group.title} gap='3'>
					<Text variant='label'>{group.title}</Text>
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
						{group.tokens.map((t) => (
							<Stack key={t.name} gap='2'>
								<div
									title={t.use}
									className={`h-15 w-full rounded-md border border-line-neutral ${SWATCH[t.name]}`}
								/>
								<Stack gap='0'>
									<Text variant='label'>{t.name}</Text>
									<TokenValue name={`--color-${t.name}`} />
								</Stack>
							</Stack>
						))}
					</div>
				</Stack>
			))}
		</Stack>
	);
}
