'use client';

import { useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Pane, Text, majorScale } from 'evergreen-ui';

import { Post, type PostProps } from '@/components/ui/Post';

const SAMPLE_POSTS: PostProps[] = [
	{
		title: 'How do I approach the graph algorithms in COS 226?',
		author: 'Sarah Chen',
		date: '2 hours ago',
		courseTag: 'COS 226',
		tags: ['Computer Science', 'algorithms', 'graphs'],
		replies: 12,
		views: 234,
	},
	{
		title: 'Best resources for understanding quantum mechanics?',
		author: 'Michael Rodriguez',
		date: '5 hours ago',
		courseTag: 'PHY 301',
		tags: ['Physics', 'quantum', 'resources'],
		replies: 8,
		views: 156,
	},
	{
		title: 'Tips for the ECO 100 midterm?',
		author: 'Emily Watson',
		date: '1 day ago',
		courseTag: 'ECO 100',
		tags: ['Economics', 'exam-prep', 'microeconomics'],
		replies: 24,
		views: 487,
	},
	{
		title: 'Study group for MAT 215 final?',
		author: 'James Park',
		date: '2 days ago',
		courseTag: 'MAT 215',
		tags: ['Mathematics', 'study-group', 'analysis'],
		replies: 6,
		views: 92,
	},
];

export function QAPage() {
	const [sort, setSort] = useState<'recent' | 'popular'>('recent');

	const askQuestionHandler = () => {
		// Placeholder for button click action
	};

	return (
		<Pane marginX='auto' maxWidth={800} padding={majorScale(5)} paddingTop={majorScale(4)}>
			<Pane
				display='flex'
				justifyContent='space-between'
				alignItems='flex-start'
				marginBottom={majorScale(3)}
			>
				<Pane>
					<Text
						fontSize={32}
						fontWeight={700}
						color='#1F2937'
						display='block'
						marginBottom={majorScale(1)}
					>
						Q&A
					</Text>
					<Text size={500} color='#6B7280'>
						Ask questions, share knowledge, help classmates
					</Text>
				</Pane>
				<Pane
					display='flex'
					alignItems='center'
					justifyContent='center'
					paddingX={majorScale(3)}
					paddingY={majorScale(2)}
					background='#FE791B'
					border='2px solid black'
					borderRadius={8}
					padding='8px'
					cursor='pointer'
					onClick={askQuestionHandler}
					style={{ flexShrink: 0 }}
				>
					<AddIcon sx={{ color: 'white', fontSize: 20, marginRight: 1 }} />
					<Text color='white' fontWeight={600} fontSize={18}>
						Ask Question
					</Text>
				</Pane>
			</Pane>

			<Pane display='flex' gap={majorScale(2)} marginBottom={majorScale(4)}>
				<Pane
					display='flex'
					alignItems='center'
					justifyContent='center'
					paddingX={majorScale(3)}
					paddingY={majorScale(2)}
					background={sort === 'recent' ? '#FE791B' : 'white'}
					borderRadius={8}
					border='2px solid black'
					cursor='pointer'
					onClick={() => setSort('recent')}
				>
					<AccessTimeIcon
						sx={{
							color: sort === 'recent' ? 'white' : '#6B7280',
							fontSize: 32,
							marginRight: 1,
							borderRadius: '50%',
							padding: '4px',
							backgroundColor: 'transparent',
						}}
					/>
					<Text
						fontWeight={600}
						fontSize={18}
						color={sort === 'recent' ? 'white' : '#374151'}
					>
						Recent
					</Text>
				</Pane>
				<Pane
					display='flex'
					alignItems='center'
					justifyContent='center'
					paddingX={majorScale(3)}
					paddingY={majorScale(2)}
					background={sort === 'popular' ? '#FE791B' : 'white'}
					borderRadius={8}
					border='2px solid black'
					cursor='pointer'
					onClick={() => setSort('popular')}
				>
					<TrendingUpIcon
						sx={{
							color: sort === 'popular' ? 'white' : '#6B7280',
							fontSize: 32,
							marginRight: 1,
							borderRadius: '50%',
							padding: '4px',
							backgroundColor: 'transparent',
						}}
					/>
					<Text
						fontWeight={600}
						fontSize={18}
						color={sort === 'popular' ? 'white' : '#374151'}
					>
						Popular
					</Text>
				</Pane>
			</Pane>

			<Pane display='flex' flexDirection='column' gap={majorScale(3)}>
				{SAMPLE_POSTS.map((post, index) => (
					<Post key={index} {...post} />
				))}
			</Pane>
		</Pane>
	);
}

export default QAPage;
