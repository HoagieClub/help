'use client';

import { useState } from 'react';

import { QuestionCard } from '@/components/question/QuestionCard';
import { Avatar, EmptyState, Heading, Stack, Tabs, Text } from '@/components/ui';
import { formatTimePassed } from '@/lib/format';

export type UserPost = {
	id: number;
	title: string;
	body: string;
	/** "Question", "Answer" or "Comment". */
	type: string;
	course?: string;
	hearts: number;
	createdAt: string;
};

export type UserProfileInfo = {
	name: string;
	email: string;
	postsCount: number;
	classYear: number;
	major: string;
};

export type UserProfileProps = {
	user: UserProfileInfo;
	questions: UserPost[];
	answers: UserPost[];
	comments: UserPost[];
};

type Tab = 'questions' | 'answers' | 'comments';

const TABS: { value: Tab; label: string }[] = [
	{ value: 'questions', label: 'Questions' },
	{ value: 'answers', label: 'Answers' },
	{ value: 'comments', label: 'Comments' },
];

/**
 * A person's profile: who they are, then their questions, answers and comments in tabs.
 *
 * @example
 * <UserProfile user={user} questions={questions} answers={[]} comments={[]} />
 */
export function UserProfile({ user, questions, answers, comments }: UserProfileProps) {
	const [tab, setTab] = useState<Tab>('questions');
	const posts = { questions, answers, comments }[tab];

	return (
		<div className='mx-auto max-w-2xl px-4 py-10'>
			<Stack gap='8'>
				<Stack direction='row' gap='6' align='center'>
					<Avatar name={user.name} size='lg' />
					<Stack gap='1'>
						<Heading variant='h2' tone='ink'>
							{user.name}
						</Heading>
						<a href={`mailto:${user.email}`}>
							<Text as='span' tone='muted'>
								{user.email}
							</Text>
						</a>
						<Text variant='small' tone='muted'>
							{user.postsCount} posts in Q&amp;A · Class of {user.classYear} ·{' '}
							{user.major}
						</Text>
					</Stack>
				</Stack>

				<Stack gap='4'>
					<Tabs label='Posts' items={TABS} value={tab} onChange={setTab} />
					{posts.length === 0 ? (
						<EmptyState title={`No ${tab} yet`} />
					) : (
						<div className='rounded-md bg-surface-gray p-4'>
							<Stack gap='3'>
								{posts.map((post) => (
									<QuestionCard
										key={post.id}
										course={post.course}
										meta={`${post.type} · ${formatTimePassed(post.createdAt)}`}
										title={post.title}
										preview={post.body}
										hearts={post.hearts}
										liked={false}
									/>
								))}
							</Stack>
						</div>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
