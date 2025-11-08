/**
 * @overview Study Group page for HoagieHelp.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import {
	Pane,
	Heading,
	Text,
	Button,
	TextInputField,
	SelectField,
	Alert,
	Spinner,
	majorScale,
} from 'evergreen-ui';
import { toast } from 'sonner';

/**
 * A React component that renders a form for user interaction, allowing users to input their name
 * and select an option from a dropdown menu. It uses Evergreen UI components for styling and
 * integrates with Auth0 for user authentication. The form submission triggers an async action that
 * simulates an API call and provides feedback through toast notifications.
 *
 * @returns {JSX.Element} The form component with user interaction elements.
 */
export function StudyGroups() {

	/**
	 * Handles the input field which can perform queries 
	 */
	const [inputValue, setInputValue] = useState('');
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	/**
	 * Handles the button click 
	 */
	const handleSubmit = () => {
		console.log("You clicked a button!");
	}

	return (
		<Pane
			maxWidth={majorScale(50)}
			marginX='auto'
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
				appearance='primary'
				onClick={handleSubmit}
				width='100%'
				marginBottom={majorScale(2)}
			>
				Click Me
			</Button>

		</Pane>
	);
}

export default StudyGroups;
