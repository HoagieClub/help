'use client';

import { Stack, Text } from '@/components/ui';
import { RADIUS_NAMES, SHADOW_NAMES, SPACING_STEPS } from '@/lib/design-tokens';

import { PageHeader, TokenValue } from '../design-ui';

// Listed literally so Tailwind generates them.
const BAR: Record<string, string> = {
	'0': 'w-0',
	'1': 'w-1',
	'2': 'w-2',
	'3': 'w-3',
	'4': 'w-4',
	'5': 'w-5',
	'6': 'w-6',
	'8': 'w-8',
	'9': 'w-9',
	'10': 'w-10',
	'15': 'w-15',
	'20': 'w-20',
	'28': 'w-28',
};
const RADIUS: Record<string, string> = {
	sm: 'rounded-sm',
	md: 'rounded-md',
	card: 'rounded-card',
	tag: 'rounded-tag',
	pill: 'rounded-pill',
};
const SHADOW: Record<string, string> = {
	card: 'shadow-card',
	'card-hover': 'shadow-card-hover',
	dropdown: 'shadow-dropdown',
};

export default function SpacingPage() {
	return (
		<Stack gap='10'>
			<PageHeader title='Spacing & radius' summary='A 4px grid. These steps only (9 is for small buttons, 20 and 28 for avatars).' />

			<Stack gap='3'>
				<Text variant='label'>Spacing</Text>
				{SPACING_STEPS.map((step) => (
					<div key={step} className='grid grid-cols-4 items-center gap-4'>
						<Text variant='code'>p-{step}</Text>
						<TokenValue name={`--spacing-${step}`} />
						<div className={`h-4 rounded-sm bg-brand ${BAR[step]}`} />
					</div>
				))}
			</Stack>

			<Stack gap='3'>
				<Text variant='label'>Radius</Text>
				<Stack direction='row' gap='6' wrap>
					{RADIUS_NAMES.map((r) => (
						<Stack key={r} gap='2' align='center'>
							<div
								className={`h-15 w-15 border border-line bg-brand-soft ${RADIUS[r]}`}
							/>
							<Text variant='code'>rounded-{r}</Text>
							<TokenValue name={`--radius-${r}`} />
						</Stack>
					))}
				</Stack>
			</Stack>

			<Stack gap='3'>
				<Text variant='label'>Shadow</Text>
				<Stack direction='row' gap='8' wrap>
					{SHADOW_NAMES.map((s) => (
						<Stack key={s} gap='2' align='center'>
							<div className={`h-15 w-15 rounded-md bg-surface ${SHADOW[s]}`} />
							<Text variant='code'>shadow-{s}</Text>
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}
