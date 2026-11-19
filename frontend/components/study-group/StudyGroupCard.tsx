import { CalendarDays, User } from 'lucide-react';

import { Button, Card, Divider, Heading, Stack, Text } from '@/components/ui';
import { formatDateTime } from '@/lib/format';

export type StudyGroupCardProps = {
	title: string;
	description: string;
	leader: string;
	meetsAt: Date | string;
	joined: number;
	spots: number;
	onJoin: () => void;
};

/**
 * One study group in the list: title, description, leader, time, spots and Join.
 *
 * @example
 * <StudyGroupCard
 *   title='COS 226 Midterm Review'
 *   description='Graph algorithms and practice problems.'
 *   leader='Jordan Lee'
 *   meetsAt={group.meeting_datetime}
 *   joined={3}
 *   spots={8}
 *   onJoin={() => join(group.id)}
 * />
 */
export function StudyGroupCard({
	title,
	description,
	leader,
	meetsAt,
	joined,
	spots,
	onJoin,
}: StudyGroupCardProps) {
	const isFull = joined >= spots;

	return (
		<div className='w-full max-w-sm'>
			<Card as='article' padding='sm'>
				<Stack gap='4'>
					<Stack gap='2'>
						<Text variant='small' tone='brand'>
							STUDY GROUP
						</Text>
						<Heading variant='title'>{title}</Heading>
						<Text variant='body-sm' tone='muted'>
							{description}
						</Text>
					</Stack>

					<Divider />

					<Stack gap='2'>
						<Stack direction='row' gap='2' align='center'>
							<User aria-hidden='true' className='h-4 w-4 text-muted' />
							<Text variant='body-sm' tone='muted'>
								Led by {leader}
							</Text>
						</Stack>
						<Stack direction='row' gap='2' align='center'>
							<CalendarDays aria-hidden='true' className='h-4 w-4 text-muted' />
							<Text variant='body-sm' tone='muted'>
								{formatDateTime(meetsAt)}
							</Text>
						</Stack>
					</Stack>

					<Stack direction='row' justify='between' align='center'>
						<Text variant='body-sm' tone='muted'>
							{joined}/{spots} spots filled
						</Text>
						<Button size='sm' onClick={onJoin} disabled={isFull}>
							{isFull ? 'Full' : 'Join'}
						</Button>
					</Stack>
				</Stack>
			</Card>
		</div>
	);
}
