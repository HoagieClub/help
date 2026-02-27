'use client';

import { useState } from 'react';

import {
	Avatar,
	Button,
	HeartIcon,
	IconButton,
	majorScale,
	Pane,
	Text,
	useTheme,
} from 'evergreen-ui';

import CommentsPanel from '@/components/comment/CommentsPanel';
import type { Answer } from '@/types';

import { formatTimePassed } from '../utils';

const MAX_LENGTH_BEFORE_TRUNCATE = 2000;

interface AnswerBoxProps {
	answer: Answer;
}

const AnswerBox = ({ answer }: AnswerBoxProps) => {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	const { text, createdAt, hearts, isAnonymous, comments } = answer;

	const displayName = isAnonymous ? 'Anonymous' : answer.user.name || 'Unknown User';
	const shouldTruncate = text.length > MAX_LENGTH_BEFORE_TRUNCATE;
	const displayText =
		isExpanded || !shouldTruncate ? text : text.slice(0, MAX_LENGTH_BEFORE_TRUNCATE) + '...';

	return (
		<Pane
			display='flex'
			flexDirection='column'
			width='100%'
			maxWidth='70rem'
			marginX='auto'
			marginBottom={majorScale(4)}
			paddingY={majorScale(3)}
			borderBottom='1px solid #e1e4e8'
		>
			<Pane display='flex' alignItems='flex-start' gap={majorScale(2)}>
				{/* Avatar and heart */}
				<Pane display='flex' flexDirection='column' alignItems='center' flexShrink={0}>
					<Avatar
						name={displayName}
						size={32}
						backgroundColor={
							isAnonymous ? theme.colors.orange100 : theme.colors.gray300
						}
					/>
					<Pane display='flex' alignItems='center' gap={2} marginTop={majorScale(1)}>
						<IconButton
							icon={HeartIcon}
							appearance='minimal'
							height={24}
							iconSize={14}
							color='gray400'
							onClick={() => alert('Heart clicked')}
						/>
						<Text size={300} color={theme.colors.gray500}>
							{hearts}
						</Text>
					</Pane>
				</Pane>

				{/* Name, timestamp, answer text, and comments */}
				<Pane flex={1} minWidth={0}>
					<Pane display='flex' alignItems='center' gap={majorScale(1)} marginBottom={4}>
						<Text
							size={300}
							fontWeight={500}
							color={isAnonymous ? theme.colors.orange700 : theme.colors.gray900}
						>
							{displayName}
						</Text>
						<Text size={300} color='muted'>
							{formatTimePassed(createdAt)}
						</Text>
					</Pane>

					<Text
						whiteSpace='pre-wrap'
						wordBreak='break-word'
						fontSize='1rem'
						fontWeight={400}
						color='#000000'
						lineHeight={1.5}
					>
						{displayText}
					</Text>

					{shouldTruncate && (
						<Button
							appearance='minimal'
							height={24}
							paddingX={0}
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? 'Read less' : 'Read more'}
						</Button>
					)}
				</Pane>
			</Pane>

			{/* CommentsPanel with the list of comments */}
			<Pane
				marginLeft={majorScale(4)}
				borderLeft='2px solid #f0f2f5'
				paddingLeft={majorScale(3)}
				marginTop={majorScale(3)}
			>
				<CommentsPanel comments={comments} />
			</Pane>
		</Pane>
	);
};

export default AnswerBox;
