'use client';

import { Heading, Pane, majorScale } from 'evergreen-ui';

import UserCard from '../../../components/UserCard';
import { useParams } from '../../../node_modules/next/navigation'; // Import useParams from next/navigation

const MOCK_USER = {
	net_id: 'jsmith',
	class_year: 2026,
	hearts: 42,
	created_at: '2024-09-01T00:00:00Z',
};

export default function UserPage() {
	const { id } = useParams<{ id: string }>();

	return (
		<Pane marginX='auto' paddingX={majorScale(16)} marginTop={majorScale(8)}>
			<Heading size={900} marginBottom={majorScale(1)} fontWeight={1000}>
				User Profile
			</Heading>

			<Heading size={400} color='muted' marginBottom={majorScale(3)}>
				ID: {id}
			</Heading>

			<UserCard user={MOCK_USER} />
		</Pane>
	);
}
