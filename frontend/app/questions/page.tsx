'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import { Button, Heading, Pane, Text, TrendingUpIcon, majorScale } from 'evergreen-ui';

export function QAPage() {
	/**
	 * Handles the recent button click
	 */
	const recentButtonHandler = () => {
		// Placeholder for button click action
	};

	/**
	 * Handles the popular button click
	 */
	const popularButtonHandler = () => {
		// Placeholder for button click action
	};

	/**
	 * Handles the ask question button click
	 */
	const askQuestionHandler = () => {
		// Placeholder for button click action
	};

	return (
		<Pane
			marginX='auto'
			padding={majorScale(2)}
			marginLeft={majorScale(16)}
			marginTop={majorScale(8)}
			marginRight={majorScale(16)}
		>
			{/* Main header */}
			<Pane
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={majorScale(1)}
			>
				<Heading size={900} marginBottom={12} fontWeight={1000}>
					Q&A
				</Heading>
				<Pane display='flex' gap={majorScale(2)}>
					<Button
						appearance='primary'
						onClick={askQuestionHandler}
						width='200px'
						paddingY={majorScale(2)}
						backgroundColor='#FE791B'
						borderRadius='8px'
						borderWidth='2px'
						borderColor='black'
						marginLeft={0}
						color='white'
						fontWeight='bold'
					>
						<AddIcon fontSize='small' style={{ marginRight: 25 }} />
						Ask Question
					</Button>
				</Pane>
			</Pane>

			{/* Subtitle */}
			<Pane marginBottom={majorScale(4)}>
				<Text size={500}>Ask questions, share knowledge, help classmates</Text>
			</Pane>

			<Pane display='flex' gap={majorScale(2)}>
				<Button
					appearance='primary'
					onClick={recentButtonHandler}
					width='100px'
					paddingY={majorScale(2)}
					marginBottom={majorScale(2)}
					backgroundColor='#FE791B'
					borderRadius='8px'
					borderWidth='2px'
					borderColor='black'
					marginLeft={0}
					color='white'
					fontWeight='bold'
				>
					<AccessTimeIcon fontSize='small' style={{ marginRight: 6 }} /> Recent
				</Button>
				<Button
					appearance='primary'
					onClick={popularButtonHandler}
					width='100px'
					paddingY={majorScale(2)}
					marginBottom={majorScale(2)}
					backgroundColor='white'
					borderRadius='8px'
					borderWidth='2px'
					borderColor='black'
					color='black'
					fontWeight='bold'
				>
					<TrendingUpIcon fontSize='small' style={{ marginRight: 6 }} />
					Popular
				</Button>
			</Pane>
		</Pane>
	);
}

export default QAPage;
