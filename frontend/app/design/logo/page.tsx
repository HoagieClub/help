import Image from 'next/image';

import { Stack, Text } from '@/components/ui';

import { PageHeader, Preview, Wordmark } from '../design-ui';

const WORDMARK_RULES = [
	'“hoagie” in ink, “help” in brand.',
	'Inter bold, all lowercase, no space.',
];

const MASCOT_RULES = [
	'Always purple.',
	'Clear space of half its width on every side.',
	'Never recolor or crop.',
];

// Shown 160px tall; widths keep each file's own proportions.
const MASCOTS = [
	{
		file: 'hoagie-wave.svg',
		alt: 'Hoagie waving',
		width: 122,
		use: 'Website hero, title slides, welcome screens',
	},
	{
		file: 'hoagie-full-color.svg',
		alt: 'Hoagie in full color',
		width: 80,
		use: 'Recruiting, About page',
	},
	{
		file: 'hoagie-one-color.svg',
		alt: 'Hoagie in one color',
		width: 80,
		use: 'Doc covers, small sizes',
	},
	{ file: 'hoagie-point.svg', alt: 'Hoagie pointing', width: 140, use: 'Club materials' },
];

function RuleList({ rules }: { rules: string[] }) {
	return (
		<Stack as='ul' gap='1'>
			{rules.map((rule) => (
				<li key={rule}>
					<Text>{rule}</Text>
				</li>
			))}
		</Stack>
	);
}

export default function LogoPage() {
	return (
		<Stack gap='10'>
			<PageHeader title='Logo & mascot' />

			<Stack gap='4'>
				<Text variant='label'>Wordmark</Text>
				<Preview>
					<Wordmark size='h1' />
				</Preview>
				<RuleList rules={WORDMARK_RULES} />
			</Stack>

			<Stack gap='4'>
				<Text variant='label'>Mascot</Text>
				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					{MASCOTS.map((m) => (
						<Stack key={m.file} gap='2'>
							<Preview>
								<Stack align='center'>
									<Image
										src={`/brand/${m.file}`}
										alt={m.alt}
										width={m.width}
										height={160}
										unoptimized
									/>
								</Stack>
							</Preview>
							<Text variant='code'>{m.file}</Text>
							<Text variant='small' tone='muted'>
								{m.use}
							</Text>
						</Stack>
					))}
				</div>
				<RuleList rules={MASCOT_RULES} />
				<Text variant='small' tone='muted'>
					Hoagie Club mascots, in frontend/public/brand/. The current HoagieHelp designs
					don&apos;t use them yet; they&apos;re here for the rebrand.
				</Text>
			</Stack>
		</Stack>
	);
}
