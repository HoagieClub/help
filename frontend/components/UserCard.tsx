'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Text, Card, majorScale, minorScale, Pane } from 'evergreen-ui';

type UserCardProps = {
	net_id: string;
	class_year: number;
	hearts: number;
	created_at: string;
};

function UserCard({ user }: { user: UserCardProps }) {
	return (
		<Card
			border='default'
			borderRadius={minorScale(1)}
			padding={majorScale(2)}
			maxWidth={320}
			marginX='auto'
			marginY={majorScale(2)}
			background='white'
		>
			<Pane display='flex' flexDirection='column' gap={minorScale(1)}>
				<Text size={500} fontWeight={600}>
					{user.net_id}
				</Text>

				<Text size={400}>Class Year: {user.class_year}</Text>
				<Text size={400}>
					{' '}
					<FavoriteIcon fontSize='small' sx={{ color: 'red' }} /> Hearts{' '}
					<FavoriteIcon fontSize='small' sx={{ color: 'red' }} />: {user.hearts}
				</Text>
				<Text size={400}>Joined: {new Date(user.created_at).toLocaleDateString()}</Text>
			</Pane>
		</Card>
	);
}

export default UserCard;
