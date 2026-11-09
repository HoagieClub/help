'use client';

import { Heading, Stack, Text } from '@/components/ui';

import { PageHeader, TokenValue } from '../design-ui';

const ROWS = [
	{ name: 'display', sample: <Heading variant='display'>Display</Heading> },
	{ name: 'h1', sample: <Heading variant='h1'>Heading 1</Heading> },
	{ name: 'h2', sample: <Heading variant='h2'>Heading 2</Heading> },
	{ name: 'h3', sample: <Heading variant='h3'>Heading 3</Heading> },
	{ name: 'lead', sample: <Text variant='lead'>Lead</Text> },
	{ name: 'body-lg', sample: <Text variant='body-lg'>Body large</Text> },
	{ name: 'body', sample: <Text>Body</Text> },
	{ name: 'label', sample: <Text variant='label'>Label</Text> },
	{ name: 'small', sample: <Text variant='small'>Small</Text> },
	{ name: 'caption', sample: <Text variant='caption'>Caption</Text> },
	{ name: 'eyebrow', sample: <Text variant='eyebrow'>EYEBROW</Text> },
	{ name: 'code', sample: <Text variant='code'>code</Text> },
];

export default function TypePage() {
	return (
		<Stack gap='8'>
			<PageHeader
				title='Typography'
				summary='Poppins for headings, Inter for reading, JetBrains Mono for eyebrows and code.'
			/>
			<Stack gap='0'>
				{ROWS.map((row) => (
					<div
						key={row.name}
						className='grid grid-cols-3 items-center gap-4 border-t border-line-neutral py-3'
					>
						<Text variant='label'>{row.name}</Text>
						<div>{row.sample}</div>
						<Text variant='small' tone='muted'>
							<TokenValue name={`--text-${row.name}`} /> /{' '}
							<TokenValue name={`--text-${row.name}--line-height`} /> /{' '}
							<TokenValue name={`--text-${row.name}--font-weight`} />
						</Text>
					</div>
				))}
			</Stack>
		</Stack>
	);
}
