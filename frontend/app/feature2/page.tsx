/**
 * @overview Sample page 2 for the template app.
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

import { useUser } from '@auth0/nextjs-auth0';
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
export function Feature2() {
	const { user, error, isLoading } = useUser();
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [formError, setFormError] = useState('');

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	/**
	 * Validates the form input to ensure both the name and selected option are provided.
	 *
	 * @returns {boolean} Returns `true` if the form is valid, otherwise `false`.
	 */
	const validateForm = (): boolean => {
		if (!name.trim()) {
			setFormError('Please enter your name.');
			return false;
		}
		if (!selectedOption) {
			setFormError('Please select an option.');
			return false;
		}
		setFormError('');
		return true;
	};

	/**
	 * Handles the form submission, validates the form, triggers an async action to simulate an API call,
	 * and displays success or error feedback via toast notifications.
	 */
	const handleSubmit = async () => {
		if (!validateForm()) {
			return;
		}

		setLoading(true);
		try {
			// Simulating an API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Form submitted successfully!', {
				description: `Name: ${name}, Option: ${selectedOption}`,
				action: {
					label: 'Undo',
					onClick: () => {
						setName('');
						setSelectedOption('');
						toast.info('Form submission undone.');
					},
				},
			});
		} catch (_error) {
			toast.error('An error occurred while submitting the form.');
		} finally {
			setLoading(false);
		}
	};

	/**
	 * Updates the `name` state when the input value changes.
	 *
	 * @param {ChangeEvent<HTMLInputElement>} e - The event triggered by changing the input value.
	 */
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

	/**
	 * Updates the `selectedOption` state when the dropdown value changes.
	 *
	 * @param {ChangeEvent<HTMLSelectElement>} e - The event triggered by selecting an option.
	 */
	const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) =>
		setSelectedOption(e.target.value);

	return (
		<Pane
			maxWidth={majorScale(50)}
			marginX='auto'
			padding={majorScale(2)}
			marginTop={majorScale(8)}
		>
			<Heading size={700} marginBottom={majorScale(2)}>
				Hi, {user?.name}
			</Heading>

			<TextInputField
				label='Name'
				value={name}
				onChange={handleNameChange}
				marginBottom={majorScale(2)}
				isInvalid={!!formError && !name.trim()}
			/>

			<SelectField
				label='Choose an option'
				value={selectedOption}
				onChange={handleOptionChange}
				marginBottom={majorScale(2)}
			>
				<option value='' disabled>
					Choose an option...
				</option>
				<option value='option1'>Option 1</option>
				<option value='option2'>Option 2</option>
				<option value='option3'>Option 3</option>
			</SelectField>

			{formError && <Alert intent='danger' title={formError} marginBottom={majorScale(2)} />}

			<Button
				appearance='primary'
				onClick={handleSubmit}
				width='100%'
				marginBottom={majorScale(2)}
				disabled={loading}
			>
				{loading ? <Spinner size={16} /> : 'Submit'}
			</Button>

			<Alert
				intent='info'
				title='This is an informational alert.'
				marginBottom={majorScale(2)}
			/>

			<Text>This is a simple template using Evergreen UI components.</Text>
		</Pane>
	);
}

export default Feature2;
