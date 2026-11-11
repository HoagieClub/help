import { CalendarDays, MapPin, User, Users } from 'lucide-react';

import { Button, Card, Heading, Stack, Tag, Text } from '@/components/ui';
import { formatDateTime } from '@/lib/format';

export type StudyGroupCardProps = {
	title: string;
	description: string;
	leader: string;
	meetsAt: Date | string;
	joined: number;
	spots: number;
	/** Shown as a green badge, e.g. "Algorithms". The API doesn't send it yet. */
	category?: string;
	/** Where the group meets. The API doesn't send it yet. */
	location?: string;
	onJoin: () => void;
};

function Detail({ icon: Icon, children }: { icon: typeof User; children: string }) {
	return (
		<Stack direction='row' gap='2' align='center'>
			<Icon aria-hidden='true' className='h-4 w-4 shrink-0 text-muted' />
			<Text variant='small' tone='muted'>
				{children}
			</Text>
		</Stack>
	);
}

/**
 * One study group in the grid: title, category, description, when and where, spots, Join Group.
 *
 * @example
 * <StudyGroupCard
 *   title='COS 226 Study Group'
 *   description='Deep dive into graph algorithms and data structures.'
 *   leader='Alex Chen'
 *   meetsAt='2025-03-28T18:00:00'
 *   joined={12}
 *   spots={15}
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
	category,
	location,
	onJoin,
}: StudyGroupCardProps) {
	const isFull = joined >= spots;

	return (
		<Card as='article' padding='sm'>
			<Stack gap='4'>
				<Stack gap='2'>
					<Stack direction='row' justify='between' align='start' gap='2'>
						<Heading variant='title'>{title}</Heading>
						{category && <Tag variant='category'>{category}</Tag>}
					</Stack>
					<div className='line-clamp-2'>
						<Text variant='small' tone='muted'>
							{description}
						</Text>
					</div>
				</Stack>

				<Stack gap='2'>
					<Detail icon={CalendarDays}>{formatDateTime(meetsAt)}</Detail>
					{location && <Detail icon={MapPin}>{location}</Detail>}
					<Detail icon={User}>{`Led by ${leader}`}</Detail>
				</Stack>

				<Detail icon={Users}>{`${joined} / ${spots} attending`}</Detail>

				<Button fullWidth onClick={onJoin} disabled={isFull}>
					{isFull ? 'Full' : 'Join Group'}
				</Button>
			</Stack>
		</Card>
	);
}
