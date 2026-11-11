import { notFound } from 'next/navigation';

import { Stack, Tag } from '@/components/ui';

import { CodeBlock, PageHeader, Preview } from '../../design-ui';
import { COMPONENT_DOCS } from '../registry';

// Only the names in the registry exist; anything else 404s without rendering the page.
export const dynamicParams = false;

export function generateStaticParams() {
	return Object.keys(COMPONENT_DOCS).map((name) => ({ name }));
}

export default async function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
	const { name } = await params;
	const doc = COMPONENT_DOCS[name];
	if (!doc) {
		notFound();
	}

	return (
		<Stack gap='6'>
			<Stack direction='row' gap='3' align='center' wrap>
				<PageHeader title={doc.title} />
				{doc.inFigma === false && <Tag>Not in Figma yet</Tag>}
			</Stack>
			<Preview>{doc.preview}</Preview>
			<CodeBlock code={doc.code} />
		</Stack>
	);
}
