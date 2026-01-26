/**
 * @overview Study Group page for HoagieHelp.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import { Button, Heading, Pane, Text, majorScale } from 'evergreen-ui';

/**
 * A React component that renders a form for user interaction, allowing users to input their name
 * and select an option from a dropdown menu. It uses Evergreen UI components for styling and
 * integrates with Auth0 for user authentication. The form submission triggers an async action that
 * simulates an API call and provides feedback through toast notifications.
 *
 * @returns {JSX.Element} The form component with user interaction elements.
 */
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
						backgroundColor='orange'
						borderRadius='8px'
						borderWidth='2px'
						borderColor='black'
						marginLeft={0}
						color='white'
						fontWeight='bold'
					>
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
					backgroundColor='orange'
					borderRadius='8px'
					borderWidth='2px'
					borderColor='black'
					marginLeft={0}
					color='white'
					fontWeight='bold'
				>
					Recent
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
					Popular
				</Button>
			</Pane>
		</Pane>
	);
}

export default QAPage;
