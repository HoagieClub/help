/**
 * @overview Sample page 1 for the template app.
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
import { RadioGroup, Text, Heading, Pane, majorScale, Spinner, Button, Alert } from 'evergreen-ui';
import Link from 'next/link';

import View from '@/components/View';

export function Feature1() {
	const { user, error, isLoading } = useUser();
	const [optionValue, setOptionValue] = useState('docs');

	// If the user data is loading, show a spinner.
	if (isLoading) {
		return <Spinner />;
	}

	// If there is an error, display the error message.
	if (error) {
		return <div>{error.message}</div>;
	}

	// Define the options with simple text labels
	const options = [
		{ label: 'Documentation', value: 'docs' },
		{ label: 'UI Library', value: 'ui' },
		{ label: 'Components Library', value: 'components' },
	];

	// Define the descriptions for each option
	const getOptionDescription = (value: string) => {
		switch (value) {
			case 'docs':
				return 'Exceptional software engineers devour documentation. Read the Hoagie docs!';
			case 'ui':
				return 'Our UI Design is mainly powered by the Evergreen library.';
			case 'components':
				return 'Complementary to Evergreen, we use the ShadCN library to compose beautiful components.';
			default:
				return '';
		}
	};

	/**
	 * Returns the appropriate URL based on the selected option.
	 *
	 * @returns {string} The URL to navigate to based on the selected option.
	 */
	const getNextUrl = () => {
		switch (optionValue) {
			case 'docs':
				return 'https://docs.hoagie.io/';
			case 'ui':
				return 'https://evergreen.segment.com/foundations';
			case 'components':
				return 'https://ui.shadcn.com/';
			default:
				return '/';
		}
	};

	// Render buttons for navigating to the selected resource or going back.
	const bottomButtons = (
		<Pane>
			<Link href={getNextUrl()} target='_blank'>
				<Button size='large' appearance='primary' float='right'>
					Learn More
				</Button>
			</Link>
			<Link href='/'>
				<Button size='large' float='left'>
					Back
				</Button>
			</Link>
		</Pane>
	);

	// Render the radio group form for selecting a resource option.
	const SelectForm = (
		<Pane marginBottom={majorScale(4)}>
			<Heading size={900} marginTop={majorScale(2)} marginBottom={majorScale(1)}>
				Hi, {user?.name}
			</Heading>
			<Text size={500}>
				Welcome to the template app! Here are some resources to get started:
			</Text>
			<RadioGroup
				size={16}
				value={optionValue}
				options={options}
				isRequired
				marginTop={majorScale(3)}
				onChange={(event) => setOptionValue(event.target.value)}
			/>

			{/* Display the description for the selected option */}
			<Pane marginTop={majorScale(2)}>
				<Text size={400}>{getOptionDescription(optionValue)}</Text>
			</Pane>
		</Pane>
	);

	return (
		<View>
			{SelectForm}
			<Pane marginBottom={32}>
				<Alert intent='warning' title='NOTE!' marginTop={24}>
					This is a template app. You are encouraged to change things and play around with
					it!
				</Alert>
			</Pane>
			{bottomButtons}
		</View>
	);
}

export default Feature1;
