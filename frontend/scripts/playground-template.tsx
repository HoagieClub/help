'use client';

/**
 * YOUR TEST PAGE: localhost:3000/playground
 *
 * Put the component you're building below and watch it update as you save.
 * This file is gitignored: it never gets committed, so edit it however you like.
 * Start over any time with: npm run playground -- --reset
 */

import { Card, Heading, Stack, Text } from '@/components/ui';
// 1. Import the component you're working on, e.g.
// import { StudyGroupCard } from '@/components/study-group/StudyGroupCard';

export default function PlaygroundPage() {
	return (
		<div className='mx-auto max-w-3xl px-4 py-10'>
			<Stack gap='6'>
				<Stack gap='1'>
					<Heading variant='h1'>Playground</Heading>
					<Text tone='muted'>
						Your private test page. Edit frontend/app/playground/page.tsx. It&apos;s
						never committed.
					</Text>
				</Stack>

				{/* 2. Render it here. Try a few versions side by side: normal, long text, empty. */}
				<Card>
					<Text>Your component goes here.</Text>
				</Card>
			</Stack>
		</div>
	);
}
