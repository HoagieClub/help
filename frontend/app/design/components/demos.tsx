'use client';

import { useState } from 'react';

import { FilterGroup, Tabs, UpvoteButton } from '@/components/ui';

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

export function FilterDemo() {
	const [sort, setSort] = useState<'recent' | 'popular'>('recent');
	return (
		<FilterGroup
			label='Sort questions'
			options={[
				{ value: 'recent', label: 'Recent' },
				{ value: 'popular', label: 'Popular' },
			]}
			value={sort}
			onChange={setSort}
		/>
	);
}

export function UpvoteDemo({ initialUpvoted }: { initialUpvoted: boolean }) {
	const [upvoted, setUpvoted] = useState(initialUpvoted);
	const [count, setCount] = useState(initialUpvoted ? 13 : 12);
	return (
		<UpvoteButton
			upvoted={upvoted}
			count={count}
			thing='answer'
			onToggle={() => {
				setUpvoted(!upvoted);
				setCount(upvoted ? count - 1 : count + 1);
			}}
		/>
	);
}
