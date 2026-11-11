import Link from 'next/link';

import { Card, Stack, Text } from '@/components/ui';

import { PageHeader } from './design-ui';
import { DESIGN_NAV } from './nav';

const RULES = [
	'Use components from @/components/ui first.',
	'Only token classes: bg-brand, text-muted, p-4. No hex codes.',
	'No made-up bracket values. Ask before adding a token.',
	'No style={{}}. Use a component prop or a token class.',
	'Change Figma and app/tokens.css in the same PR.',
];

export default function DesignOverviewPage() {
	return (
		<Stack gap='8'>
			<PageHeader title='Design system' summary='HoagieHelp tokens and components, taken from the current designs in Figma.' />

			<Stack gap='3'>
				<Text variant='label'>The five rules</Text>
				<Stack as='ol' gap='1'>
					{RULES.map((rule, i) => (
						<li key={rule}>
							<Text>
								{i + 1}. {rule}
							</Text>
						</li>
					))}
				</Stack>
			</Stack>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
				{DESIGN_NAV.slice(1).map((group) => (
					<Card key={group.title} padding='sm'>
						<Stack gap='2'>
							<Text variant='small' tone='muted'>
								{group.title.toUpperCase()}
							</Text>
							{group.items.map((item) => (
								<Link key={item.href} href={item.href}>
									<Text as='span' variant='label' tone='brand'>
										{item.label}
									</Text>
								</Link>
							))}
						</Stack>
					</Card>
				))}
			</div>
		</Stack>
	);
}
