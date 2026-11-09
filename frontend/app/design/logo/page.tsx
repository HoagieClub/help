import { Stack, Text } from '@/components/ui';

import { PageHeader, Preview, Wordmark } from '../design-ui';

const WORDMARK_RULES = [
	'“hoagie” in ink, “help” in brand.',
	'Poppins 600, all lowercase, no space.',
	'Mascot mint and orange are fills only, never text.',
];

export default function LogoPage() {
	return (
		<Stack gap='8'>
			<PageHeader title='Logo & mascot' />
			<Preview>
				<Wordmark size='display' />
			</Preview>
			<Stack as='ul' gap='1'>
				{WORDMARK_RULES.map((rule) => (
					<li key={rule}>
						<Text>{rule}</Text>
					</li>
				))}
			</Stack>
		</Stack>
	);
}
