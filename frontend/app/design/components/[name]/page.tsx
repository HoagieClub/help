import { notFound } from 'next/navigation';

import { Stack } from '@/components/ui';

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
			<PageHeader title={doc.title} />
			<Preview>{doc.preview}</Preview>
			<CodeBlock code={doc.code} />
		</Stack>
	);
}
