'use client';

import { Pane } from 'evergreen-ui';

type User = {
	net_id: string;
	class_year: number;
	hearts: number;
	created_at: string;
};

function UserCard({ user }: { user: User }) {
	return (
		<Pane
			border='default'
			borderRadius={8}
			padding={16}
			maxWidth={320}
			marginX='auto'
			marginY={20}
			background='white'
		>
			<p>{user.net_id}</p>
			<p>Class Year: {user.class_year}</p>
			<p>Hearts: {user.hearts}</p>
			<p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
		</Pane>
	);
}

export default UserCard;
