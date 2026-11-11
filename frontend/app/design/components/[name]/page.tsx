import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Divider, Heading, Stack, Tag, Text } from '@/components/ui';

import { CodeBlock, PageHeader, Preview } from '../../design-ui';
import { findItem } from '../../nav';
import { COMPONENT_DOCS } from '../registry';

// Only the names in the registry exist; anything else 404s without rendering the page.
export const dynamicParams = false;

export function generateStaticParams() {
	return Object.keys(COMPONENT_DOCS).map((name) => ({ name }));
}

/** "QuestionCard" for question-card, used in the import line. */
function componentName(title: string) {
	return title
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('');
}

const FEATURE_IMPORTS: Record<string, string> = {
	'question-card': '@/components/question/QuestionCard',
	'study-group-card': '@/components/study-group/StudyGroupCard',
};

export default async function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
	const { name } = await params;
	const doc = COMPONENT_DOCS[name];
	if (!doc) {
		notFound();
	}
	const { item, previous, next } = findItem(`/design/components/${name}`);
	const importLine = `import { ${componentName(doc.title)} } from '${FEATURE_IMPORTS[name] ?? '@/components/ui'}';`;

	return (
		<Stack gap='8'>
			<Stack gap='3'>
				<Stack direction='row' gap='3' align='center' wrap>
					<PageHeader title={doc.title} />
					{item?.notInFigma && <Tag>Not in Figma yet</Tag>}
				</Stack>
				{item?.summary && <Text tone='muted'>{item.summary}</Text>}
			</Stack>

			<Stack gap='3'>
				<Heading variant='title' as='h2'>
					Example
				</Heading>
				<Preview>{doc.preview}</Preview>
			</Stack>

			<Stack gap='3'>
				<Heading variant='title' as='h2'>
					Code
				</Heading>
				<CodeBlock code={`${importLine}\n\n${doc.code}`} />
				{item?.example && (
					<Text variant='body-sm' tone='muted'>
						See it in the app:{' '}
						<code className='font-mono text-code text-ink'>{item.example}</code>
					</Text>
				)}
			</Stack>

			<Divider />

			<Stack direction='row' justify='between' gap='4' wrap>
				{previous ? (
					<Link
						href={previous.href}
						className='flex items-center gap-2 font-body text-label text-ink hover:text-brand'
					>
						<ArrowLeft aria-hidden='true' className='h-4 w-4' />
						{previous.label}
					</Link>
				) : (
					<span />
				)}
				{next && (
					<Link
						href={next.href}
						className='flex items-center gap-2 font-body text-label text-ink hover:text-brand'
					>
						{next.label}
						<ArrowRight aria-hidden='true' className='h-4 w-4' />
					</Link>
				)}
			</Stack>
		</Stack>
	);
}
