'use client';

import { EyeIcon, HeartIcon } from '@phosphor-icons/react';
import { Card, Heading, majorScale, minorScale, Pane, Text } from 'evergreen-ui';

import { formatTimePassed } from '@/components/utils';

import type { UserPost } from './sampleTypes';

export default function PostCard({ post }: { post: UserPost }) {
	const allTags = post.course ? [post.course, ...post.tags] : post.tags;

	return (
		<Card
			background='white'
			borderRadius={8}
			elevation={0}
			padding={majorScale(3)}
			marginBottom={majorScale(2)}
			style={{
				border: '1px solid #e2e4e9',
				boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
			}}
		>
			{/* Post type and time */}
			<Pane
				display='flex'
				alignItems='center'
				gap={minorScale(2)}
				marginBottom={minorScale(2)}
			>
				<Text size={300} color='#737b8c'>
					{post.type}
				</Text>
				<Pane
					width={5}
					height={5}
					borderRadius='50%'
					backgroundColor='#737b8c'
					flexShrink={0}
				/>
				<Text size={300} color='#737b8c'>
					{formatTimePassed(post.createdAt)}
				</Text>
			</Pane>

			{/* Title */}
			<Heading size={400} marginBottom={minorScale(2)} color='#1a1a1a' fontWeight={600}>
				{post.title}
			</Heading>

			{/* Body */}
			<Text
				size={300}
				color='#4a4a4a'
				lineHeight={1.6}
				display='block'
				marginBottom={majorScale(2)}
			>
				{post.body}
			</Text>

			{/* Tags */}
			{allTags.length > 0 && (
				<Pane
					display='flex'
					flexWrap='wrap'
					gap={minorScale(2)}
					marginBottom={majorScale(2)}
				>
					{allTags.map((tag, index) => {
						const isCourse = index === 0 && post.course;
						return (
							<Pane
								key={tag}
								paddingX={minorScale(3)}
								paddingY={minorScale(1)}
								borderRadius={9999}
								backgroundColor={isCourse ? '#f04242' : 'white'}
								style={{ border: isCourse ? 'none' : '1px solid #d0d0d0' }}
							>
								<Text
									size={300}
									color={isCourse ? '#ffffff' : '#2b303b'}
									fontWeight={400}
								>
									{tag}
								</Text>
							</Pane>
						);
					})}
				</Pane>
			)}

			{/* Footer: hearts and views */}
			<Pane display='flex' alignItems='center' gap={majorScale(2)}>
				<Pane display='flex' alignItems='center' gap={minorScale(1)}>
					<HeartIcon size={15} color='#777' />
					<Text size={300} color='#777' fontWeight={600}>
						{post.hearts}
					</Text>
				</Pane>
				{post.views > 0 && (
					<Pane display='flex' alignItems='center' gap={minorScale(1)}>
						<EyeIcon size={16} color='#777' />
						<Text size={300} color='#777' fontWeight={600}>
							{post.views} views
						</Text>
					</Pane>
				)}
			</Pane>
		</Card>
	);
}
