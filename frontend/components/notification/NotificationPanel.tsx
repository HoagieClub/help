import { MessageCircle, MessageSquare } from 'lucide-react';

import { Button, Card, Heading, Stack, Text } from '@/components/ui';
import { formatTimePassed } from '@/lib/format';
import type { Notification } from '@/types';

const MAX_SHOWN = 4;

export type NotificationPanelProps = {
	notifications: Notification[];
	onViewAll: () => void;
};

/**
 * The latest few notifications (answers to your questions, comments on your answers).
 *
 * @example
 * <NotificationPanel notifications={notifications} onViewAll={() => router.push('/notifications')} />
 */
export function NotificationPanel({ notifications, onViewAll }: NotificationPanelProps) {
	const shown = notifications.slice(0, MAX_SHOWN);

	return (
		<div className='w-full max-w-sm'>
			<Card padding='sm'>
				<Stack gap='4'>
					<Heading variant='title'>Notifications</Heading>

					{shown.length === 0 ? (
						<Text variant='body-sm' tone='muted'>
							No notifications
						</Text>
					) : (
						<Stack as='ul' gap='3'>
							{shown.map((notification) => {
								const isComment = notification.comment !== null;
								const Icon = isComment ? MessageCircle : MessageSquare;
								return (
									<li key={notification.id} className='flex items-start gap-3'>
										<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand-soft text-brand'>
											<Icon aria-hidden='true' className='h-4 w-4' />
										</span>
										<Stack gap='0'>
											<Text variant='body-sm'>
												{isComment
													? 'Someone commented on your answer '
													: 'Someone answered your question '}
												<b>{notification.question.title}</b>
											</Text>
											<Text variant='small' tone='muted'>
												{formatTimePassed(notification.createdAt)}
											</Text>
										</Stack>
									</li>
								);
							})}
						</Stack>
					)}

					{shown.length > 0 && (
						<Button variant='secondary' fullWidth onClick={onViewAll}>
							View all
						</Button>
					)}
				</Stack>
			</Card>
		</div>
	);
}
