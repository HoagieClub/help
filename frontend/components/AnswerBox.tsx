'use client';

import { majorScale, Pane, Text } from 'evergreen-ui';

import CommentsPanel from '@/components/CommentsPanel';
import type { Answer } from '@/types';

interface AnswerBoxProps {
	answer: Answer;
}

/**
 * Reusing the formatting logic consistent with QuestionPanel
 */
function formatTimePassed(input: Date | string | number): string {
	const now = Date.now();
	const past = new Date(input).getTime();
	const diffMs = now - past;
	if (diffMs < 0) return 'just now';

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) return 'just now';
	if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
	if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
	return `${days} day${days === 1 ? '' : 's'} ago`;
}

function formatMetadata(user: string, createdAt: Date | string, userIsAnonymous: boolean): string {
	const displayUser = userIsAnonymous ? 'Anonymous' : user;
	const displayTimePassed = formatTimePassed(createdAt);
	return `${displayUser} • ${displayTimePassed}`;
}

const AnswerBox = ({ answer }: AnswerBoxProps) => {
	const { text, createdAt, hearts, isAnonymous, comments } = answer;

	const metadata = formatMetadata(answer.user.name || 'Unknown User', createdAt, isAnonymous);

	return (
		<Pane
			display='flex'
			flexDirection='column'
			width='70rem'
			marginX='auto'
			marginBottom={majorScale(4)}
			paddingY={majorScale(3)}
			borderBottom='1px solid #e1e4e8'
		>
			<Pane
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={majorScale(2)}
			>
				<Text fontSize='0.8rem' fontWeight={300} color='#858ba4'>
					{metadata}
				</Text>
				<Text fontSize='0.85rem' fontWeight={500} color='#1e2b49'>
					<Text fontWeight={400} color='#858ba4' marginRight={4}>
						Likes:
					</Text>
					{hearts}
				</Text>
			</Pane>

			<Text
				width='57rem'
				wordWrap='break-word'
				fontSize='1rem'
				fontWeight={400}
				color='#000000'
				lineHeight={1.5}
				marginBottom={majorScale(3)}
			>
				{text}
			</Text>

			<Pane
				marginLeft={majorScale(4)}
				borderLeft='2px solid #f0f2f5'
				paddingLeft={majorScale(3)}
			>
				<CommentsPanel comments={comments} />
			</Pane>
		</Pane>
	);
};

export default AnswerBox;
