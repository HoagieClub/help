/**
 * @overview Profile card component for the template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import { type User } from '@auth0/nextjs-auth0/types';
import { majorScale, Button, Heading, Card, Avatar, Text } from 'evergreen-ui';

import { hoagieTemplate } from '@/lib/hoagie-ui/Theme/themes';

/**
 * ProfileCard is a profile card meant for display of user information
 *  throughout different Hoagie applications.
 */
export function ProfileCard({ user }: { user: User }) {
	const theme = hoagieTemplate;
	const name = user?.name;
	const email = user?.email || (user?.sub?.includes('@') ? user.sub.split('|').pop() : 'N/A');

	return (
		<Card
			elevation={1}
			backgroundColor={theme.colors.gray50}
			padding={majorScale(3)}
			maxWidth={majorScale(30)}
			borderRadius={8}
			display='flex'
			flexDirection='column'
			alignItems='center'
		>
			<Avatar name={name} backgroundColor={theme.colors.teal100} size={40} />
			<Heading size={500} marginTop={majorScale(1)}>
				{name}
			</Heading>
			<Text color='muted' size={300} marginTop={2}>
				{email}
			</Text>
			<a href='/auth/logout'>
				<Button marginTop={16}>Log Out</Button>
			</a>
		</Card>
	);
}

export default ProfileCard;
