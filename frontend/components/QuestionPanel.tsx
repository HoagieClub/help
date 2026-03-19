'use client';

import { Heading, majorScale, Pane, Text } from 'evergreen-ui';

export type QuestionPanelProps = {
	title: string;
	details: string;
	tags: number[];
	course: string | null;
	createTime: string;
	heart: number;
	view: number;
	userIsAnonymous: boolean;
};

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

export default function QuestionPanel(props: QuestionPanelProps) {
	const { title, details, tags, course, createTime, heart, view, userIsAnonymous } = props;
	const displayUser = userIsAnonymous ? 'Anonymous' : 'User';
	const displayTime = formatTimePassed(createTime);
	const metadata = `${displayUser} • ${displayTime}`;

	return (
		<Pane
			display='flex'
			flexDirection='column'
			marginBottom={majorScale(4)}
			paddingY={majorScale(3)}
			borderBottom='1px solid #e1e4e8'
		>
			<Heading size={800} marginBottom={majorScale(2)} fontWeight={800}>
				{title}
			</Heading>

			<Pane
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={majorScale(2)}
			>
				<Text fontSize='0.8rem' fontWeight={300} color='#858ba4'>
					{metadata}
				</Text>
				<Pane display='flex' gap={majorScale(2)}>
					<Text fontSize='0.85rem' fontWeight={500} color='#1e2b49'>
						<Text fontWeight={400} color='#858ba4' marginRight={4}>
							Hearts:
						</Text>
						{heart}
					</Text>
					<Text fontSize='0.85rem' fontWeight={500} color='#1e2b49'>
						<Text fontWeight={400} color='#858ba4' marginRight={4}>
							Views:
						</Text>
						{view}
					</Text>
				</Pane>
			</Pane>

			{course && (
				<Pane marginBottom={majorScale(2)}>
					<Text fontSize='0.9rem' fontWeight={500} color='#1e2b49'>
						Course: {course}
					</Text>
				</Pane>
			)}

			{tags.length > 0 && (
				<Pane display='flex' flexWrap='wrap' gap={majorScale(1)} marginBottom={majorScale(2)}>
					{tags.map((tagId) => (
						<Pane
							key={tagId}
							paddingX={majorScale(2)}
							paddingY={majorScale(1)}
							borderRadius={4}
							backgroundColor='#f0f2f5'
						>
							<Text fontSize='0.8rem' fontWeight={500} color='#1e2b49'>
								Tag #{tagId}
							</Text>
						</Pane>
					))}
				</Pane>
			)}

			<Text
				wordWrap='break-word'
				fontSize='1rem'
				fontWeight={400}
				color='#000000'
				lineHeight={1.5}
			>
				{details}
			</Text>
		</Pane>
	);
}
