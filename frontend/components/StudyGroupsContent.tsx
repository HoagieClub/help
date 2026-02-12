'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import {
	Button,
	Heading,
	Pane,
	Text,
	TextInputField,
	majorScale,
} from 'evergreen-ui';
import Link from 'next/link';

/**
 * Content section for the Study Groups page: header, search input, and actions.
 */
export function StudyGroupsContent() {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		// Placeholder for button click action
	};

	return (
		<Pane
			maxWidth={majorScale(50)}
			marginX="auto"
			padding={majorScale(2)}
			marginTop={majorScale(8)}
		>
			{/* Main header */}
			<Heading size={900} marginBottom={24}>
				Study Groups
			</Heading>

			{/* Subtitle */}
			<Text size={500} marginBottom={24}>
				Find classmates and form study groups
			</Text>

			<TextInputField
				placeholder="Type here..."
				value={inputValue}
				onChange={handleChange}
			/>

			<Button
				appearance="primary"
				onClick={handleSubmit}
				width="100%"
				marginBottom={majorScale(2)}
			>
				Find Study Groups
			</Button>
			<Link href="/study-groups/form">
				<Button appearance="primary" marginBottom={majorScale(2)}>
					Create Study Group
				</Button>
			</Link>
		</Pane>
	);
}
