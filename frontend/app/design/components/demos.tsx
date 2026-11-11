'use client';

import { useState } from 'react';

import { HeartButton, Tabs } from '@/components/ui';

/** Small stateful wrappers so /design can show interactive components working. */

export function TabsDemo() {
	const [tab, setTab] = useState<'questions' | 'answers' | 'comments'>('questions');
	return (
		<Tabs
			label='Posts'
			items={[
				{ value: 'questions', label: 'Questions' },
				{ value: 'answers', label: 'Answers' },
				{ value: 'comments', label: 'Comments' },
			]}
			value={tab}
			onChange={setTab}
		/>
	);
}

export function HeartDemo({ initialHearted }: { initialHearted: boolean }) {
	const [hearted, setHearted] = useState(initialHearted);
	const [count, setCount] = useState(initialHearted ? 13 : 12);
	return (
		<HeartButton
			hearted={hearted}
			count={count}
			thing='answer'
			onToggle={() => {
				setHearted(!hearted);
				setCount(hearted ? count - 1 : count + 1);
			}}
		/>
	);
}
