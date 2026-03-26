'use client';

import { Heading, Pane, majorScale } from 'evergreen-ui';
import { useParams } from 'next/navigation';

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
		</Pane>
	);
}
