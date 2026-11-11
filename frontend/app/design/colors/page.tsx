'use client';

import { Stack, Text } from '@/components/ui';
import { COLOR_GROUPS } from '@/lib/design-tokens';

import { PageHeader, TokenValue } from '../design-ui';
import { findItem } from '../nav';

// Tailwind only generates classes it can see written in full, so swatch classes are listed literally.
const SWATCH: Record<string, string> = {
	brand: 'bg-brand',
	'brand-hover': 'bg-brand-hover',
	'brand-soft': 'bg-brand-soft',
	focus: 'bg-focus',
	ink: 'bg-ink',
	muted: 'bg-muted',
	surface: 'bg-surface',
	'surface-gray': 'bg-surface-gray',
	line: 'bg-line',
	neutral: 'bg-neutral',
	success: 'bg-success',
	'success-soft': 'bg-success-soft',
	warning: 'bg-warning',
	'warning-soft': 'bg-warning-soft',
	danger: 'bg-danger',
	'danger-soft': 'bg-danger-soft',
};

export default function ColorsPage() {
	return (
		<Stack gap='8'>
			<PageHeader
				figma={findItem('/design/colors').item?.figma}
				title='Colors'
				summary='Write them as classes: bg-brand for a background, text-muted for text, border-line for a border.'
			/>
			{COLOR_GROUPS.map((group) => (
				<Stack key={group.title} gap='3'>
					<Text variant='label'>{group.title}</Text>
					<div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
						{group.tokens.map((t) => (
							<Stack key={t.name} gap='2'>
								<div
									title={t.use}
									className={`h-15 w-full rounded-md border border-line ${SWATCH[t.name]}`}
								/>
								<Stack gap='0'>
									<Text variant='label'>{t.name}</Text>
									<Text variant='small' tone='muted'>
										{t.use}
									</Text>
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
