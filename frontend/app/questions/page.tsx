'use client';

import { useState } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Pane, Text, majorScale } from 'evergreen-ui';
import Link from 'next/link';

export function QAPage() {
	const [sort, setSort] = useState<'recent' | 'popular'>('recent');


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
				<Link href='/questions/ask' style={{ textDecoration: 'none', flexShrink: 0 }}>
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
					>
						<AddIcon sx={{ color: 'white', fontSize: 20, marginRight: 1 }} />
						<Text color='white' fontWeight={600} fontSize={18}>
							Ask Question
						</Text>
					</Pane>
				</Link>
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
				{/* TODO: Fetch and render posts from API */}
			</Pane>
		</Pane>
	);
}

export default QAPage;
