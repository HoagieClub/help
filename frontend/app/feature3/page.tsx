/**
 * @overview Sample page 3 for the template app.
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

import { useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0';
import { Text, Heading, Pane, majorScale, Spinner, Button, Alert } from 'evergreen-ui';
import { toast } from 'sonner';

import View from '@/components/View';

/**
 * Simulates an API request to update the count.
 * The function waits for 1 second before resolving and has a 50% chance of failure.
 *
 * @param {number} value - The new counter value to be updated.
 * @returns {Promise<number>} The updated counter value.
 * @throws {Error} Throws an error if the update fails.
 */
const updateCountAPI = async (value: number): Promise<number> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	if (Math.random() < 0.5) {
		throw new Error('Update failed');
	}
	return value;
};

/**
 * Main page component for the counter demo.
 *
 * This component shows the user's name, a counter, and two buttons to increment or decrement
 * the counter. It also handles errors and displays a toast notification on success or failure.
 *
 * @returns {JSX.Element} The rendered page component.
 */
export function Feature3() {
	const { user, error, isLoading } = useUser();
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);

	// If user data is loading, display a spinner.
	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	/**
	 * Handles the counter update logic.
	 * Calls `updateCountAPI` to simulate the API request, manages loading state, and shows toast notifications.
	 *
	 * @param {number} delta - The amount to increment or decrement the counter.
	 * @returns {Promise<void>} Updates the counter and manages UI state.
	 */
	const updateCount = async (delta: number) => {
		setLoading(true);
		try {
			const newCount = count + delta;
			const result = await updateCountAPI(newCount);
			setCount(result);
			toast.success('Counter updated', {
				description: `New count is ${result}`,
			});
		} catch (_error) {
			toast.error('Update failed', {
				description: 'Could not update the counter. Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			{/* Section displaying the user's name and the counter */}
			<Pane marginBottom={majorScale(4)}>
				<Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
					Hi, {user?.name}
				</Heading>
				<Text size={500}>Count:</Text>
				<Heading size={800} marginTop={majorScale(2)} display='flex' alignItems='center'>
					{count}
					{loading && <Spinner size={24} marginLeft={majorScale(2)} />}
				</Heading>
			</Pane>

			{/* Buttons for incrementing and decrementing the counter */}
			<Pane>
				<Button
					size='large'
					appearance='primary'
					onClick={() => updateCount(1)}
					marginRight={majorScale(2)}
					disabled={loading}
				>
					Increment
				</Button>
				<Button
					size='large'
					intent='danger'
					onClick={() => updateCount(-1)}
					disabled={loading}
				>
					Decrement
				</Button>
			</Pane>

			{/* Informational alert about the counter's 50% failure rate */}
			<Pane marginTop={majorScale(4)}>
				<Alert intent='info' title='Info'>
					The counter has a <strong>50% chance of failure</strong> to demonstrate error
					handling. Please try again if the update fails.
				</Alert>
			</Pane>
		</View>
	);
}

export default Feature3;
