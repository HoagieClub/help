'use client';

import { useState } from 'react';

import { QuestionCard } from '@/components/question/QuestionCard';
import { Avatar, EmptyState, Heading, MetaRow, Stack, Tabs } from '@/components/ui';
import { formatTimePassed } from '@/lib/format';

export type UserPost = {
	id: number;
	title: string;
	body: string;
	/** Where it was posted, e.g. "Q&A". */
	type: string;
	course?: string;
	tags?: string[];
	upvotes: number;
	views?: number;
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
 * A person's profile (User Page, Option #1 in Figma): avatar, name, email and facts,
 * then their questions, answers and comments in tabs.
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
					<Avatar name={user.name} size='xl' />
					<Stack gap='1'>
						<Heading variant='h1'>{user.name}</Heading>
						<a
							href={`mailto:${user.email}`}
							className='font-body text-body text-muted underline'
						>
							{user.email}
						</a>
						<MetaRow
							size='lg'
							items={[
								`${user.postsCount} posts in Q&A`,
								`Class of ${user.classYear}`,
								user.major,
							]}
						/>
					</Stack>
				</Stack>

				<Stack gap='6'>
					<Tabs label='Posts' items={TABS} value={tab} onChange={setTab} />
					{posts.length === 0 ? (
						<EmptyState title={`No ${tab} yet`} />
					) : (
						<Stack gap='6'>
							{posts.map((post) => (
								<QuestionCard
									key={post.id}
									layout='profile'
									meta={[post.type, formatTimePassed(post.createdAt)]}
									title={post.title}
									preview={post.body}
									course={post.course}
									tags={post.tags}
									upvotes={post.upvotes}
									views={post.views}
								/>
							))}
						</Stack>
					)}
				</Stack>
			</Stack>
		</div>
	);
}
