'use client';

import { useState } from 'react';

import { Avatar, Heading, majorScale, minorScale, Pane, Text } from 'evergreen-ui';

import PostCard from './PostCard';

import type { UserPost, UserPostsProps } from './sampleTypes';

const TABS = ['Questions', 'Answers', 'Comments'] as const;
type TabName = (typeof TABS)[number];

export default function UserPostsPage({ user, questions, answers, comments }: UserPostsProps) {
	const [selectedTab, setSelectedTab] = useState<TabName>('Questions');

	const postsForTab: Record<TabName, UserPost[]> = {
		Questions: questions,
		Answers: answers,
		Comments: comments,
	};

	return (
		<Pane minHeight='100vh' backgroundColor='#fafafa'>
			<Pane maxWidth={702} marginX='auto' paddingTop={majorScale(5)} paddingX={majorScale(2)}>
				{/* User profile header */}
				<Pane
					display='flex'
					alignItems='center'
					gap={majorScale(3)}
					marginBottom={majorScale(4)}
				>
					<Avatar name={user.name} size={80} backgroundColor='#e2e4e9' color='#737b8c' />
					<Pane>
						<Heading size={700} color='#2b303b' marginBottom={minorScale(1)}>
							{user.name}
						</Heading>
						<Text
							size={400}
							color='#737b8c'
							display='block'
							marginBottom={minorScale(2)}
						>
							<a href={`mailto:${user.email}`} style={{ color: '#737b8c' }}>
								{user.email}
							</a>
						</Text>
						<Pane display='flex' alignItems='center' gap={minorScale(2)}>
							<Text size={300} color='#737b8c'>
								{user.postsCount} posts in Q&amp;A
							</Text>
							<Pane
								width={6}
								height={6}
								borderRadius='50%'
								backgroundColor='#737b8c'
							/>
							<Text size={300} color='#737b8c'>
								Class of {user.classYear}
							</Text>
							<Pane
								width={6}
								height={6}
								borderRadius='50%'
								backgroundColor='#737b8c'
							/>
							<Text size={300} color='#737b8c'>
								{user.major}
							</Text>
						</Pane>
					</Pane>
				</Pane>

				{/* Tab navigation */}
				<Pane display='flex' borderBottom='1px solid #e2e4e9'>
					{TABS.map((tab) => {
						const isActive = selectedTab === tab;
						return (
							<Pane
								key={tab}
								role='tab'
								cursor='pointer'
								paddingX={minorScale(3)}
								paddingBottom={minorScale(2)}
								marginBottom='-1px'
								borderBottom={
									isActive ? '2px solid #f04242' : '2px solid transparent'
								}
								onClick={() => setSelectedTab(tab)}
							>
								<Text
									size={400}
									color={isActive ? '#f04242' : '#737b8c'}
									fontWeight={isActive ? 600 : 400}
								>
									{tab}
								</Text>
							</Pane>
						);
					})}
				</Pane>

				{/* Posts list */}
				<Pane marginTop={majorScale(3)}>
					{postsForTab[selectedTab].length === 0 ? (
						<Text size={400} color='#737b8c'>
							No {selectedTab.toLowerCase()} yet.
						</Text>
					) : (
						postsForTab[selectedTab].map((post) => (
							<PostCard key={post.id} post={post} />
						))
					)}
				</Pane>
			</Pane>
		</Pane>
	);
}
