'use client';

import { Heading, Stack, Text } from '@/components/ui';

import { PageHeader, TokenValue } from '../design-ui';

const ROWS = [
	{ name: 'h1', sample: <Heading variant='h1'>Ask a Question</Heading> },
	{
		name: 'h2',
		sample: <Heading variant='h2'>Best strategies for COS226 midterm prep?</Heading>,
	},
	{ name: 'h3', sample: <Heading variant='h3'>Alex Chen</Heading> },
	{ name: 'title', sample: <Heading variant='title'>2 Answers</Heading> },
	{ name: 'body', sample: <Text>I have my midterm coming up in two weeks.</Text> },
	{ name: 'body-sm', sample: <Text variant='body-sm'>Sarah Park • 2h ago</Text> },
	{ name: 'label', sample: <Text variant='label'>Question Title</Text> },
	{ name: 'small', sample: <Text variant='small'>exam prep</Text> },
	{ name: 'code', sample: <Text variant='code'>text-body</Text> },
];

export default function TypePage() {
	return (
		<Stack gap='8'>
			<PageHeader
				title='Typography'
				summary='Inter for everything. Use the class text-{name}, e.g. text-body-sm.'
			/>
			<Stack gap='0'>
				{ROWS.map((row) => (
					<div
						key={row.name}
						className='grid grid-cols-3 items-center gap-4 border-t border-line py-3'
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
