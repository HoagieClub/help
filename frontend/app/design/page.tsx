import Link from 'next/link';

import { Card, Heading, Stack, Text } from '@/components/ui';

import { CodeBlock, PageHeader } from './design-ui';
import { DESIGN_NAV } from './nav';

const STEPS = [
	{
		title: 'Import pieces from one place',
		body: 'Every button, input, card and heading comes from @/components/ui. You never style these yourself.',
	},
	{
		title: 'Lay them out with Stack',
		body: 'Stack puts things in a row or a column with an even gap, so you never write margins.',
	},
	{
		title: 'Try it on the playground',
		body: 'Run npm run playground, then open /playground. It’s your private test page and is never committed.',
	},
	{
		title: 'Run npm run lint',
		body: 'If you used a raw color, a made-up size or style={{}}, lint tells you what to use instead.',
	},
];

const EXAMPLE = `import { Button, Card, Heading, Stack, Text } from '@/components/ui';

export function StudyTip() {
  return (
    <Card>
      <Stack gap='3'>
        <Heading variant='title'>Start the PSET early</Heading>
        <Text variant='body-sm' tone='muted'>Office hours fill up on Thursdays.</Text>
        <Button>Got it</Button>
      </Stack>
    </Card>
  );
}`;

const RULES = [
	'Use a component from @/components/ui before writing your own markup.',
	'Colors and sizes come from token classes (bg-brand, text-muted, p-4). No hex codes.',
	'No style={{}} and no made-up sizes in square brackets.',
	'Stuck? Find the closest component in the sidebar and copy its example.',
];

export default function DesignStartPage() {
	const components = DESIGN_NAV.filter((group) => group.title !== 'Foundations');

	return (
		<Stack gap='10'>
			<PageHeader
				title='Start here'
				summary='The pieces HoagieHelp is built from. Find what you need, copy the example, and you’re done.'
			/>

			<Stack gap='4'>
				<Heading variant='h3' as='h2'>
					Build something in 4 steps
				</Heading>
				<ol className='m-0 grid list-none gap-4 p-0 sm:grid-cols-2'>
					{STEPS.map((step, index) => (
						<li key={step.title}>
							<Card padding='sm'>
								<Stack gap='2'>
									<Text variant='small' tone='brand'>
										Step {index + 1}
									</Text>
									<Heading variant='title' as='h3'>
										{step.title}
									</Heading>
									<Text variant='body-sm' tone='muted'>
										{step.body}
									</Text>
								</Stack>
							</Card>
						</li>
					))}
				</ol>
				<CodeBlock code={EXAMPLE} />
			</Stack>

			<Stack gap='4'>
				<Stack gap='1'>
					<Heading variant='h3' as='h2'>
						I want to…
					</Heading>
					<Text variant='body-sm' tone='muted'>
						Pick what you’re trying to do. Each page has a live example and code you can
						copy.
					</Text>
				</Stack>
				<div className='grid gap-4 sm:grid-cols-2'>
					{components.map((group) => (
						<Card key={group.title} padding='sm'>
							<Stack gap='3'>
								<Stack gap='1'>
									<Heading variant='title' as='h3'>
										{group.title}
									</Heading>
									<Text variant='small' tone='muted'>
										{group.description}
									</Text>
								</Stack>
								<Stack as='ul' gap='2'>
									{group.items.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className='group block rounded-sm focus-visible:outline-2 focus-visible:outline-focus'
											>
												<span className='font-body text-label text-brand group-hover:underline'>
													{item.label}
												</span>
												<span className='font-body text-body-sm text-muted'>
													{' '}
													— {item.summary}
												</span>
											</Link>
										</li>
									))}
								</Stack>
							</Stack>
						</Card>
					))}
				</div>
			</Stack>

			<Stack gap='3'>
				<Heading variant='h3' as='h2'>
					The rules
				</Heading>
				<Stack as='ol' gap='2'>
					{RULES.map((rule, index) => (
						<li key={rule}>
							<Text variant='body-sm'>
								{index + 1}. {rule}
							</Text>
						</li>
					))}
				</Stack>
				<Text variant='small' tone='muted'>
					Colors, type and spacing are under Foundations in the sidebar. The full guide is
					frontend/DESIGN_SYSTEM.md.
				</Text>
			</Stack>
		</Stack>
	);
}
