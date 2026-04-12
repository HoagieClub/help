import { Pane, Heading, Button, Text } from 'evergreen-ui';
import { MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md';

import type { Notification } from '@/types';

import { formatTimePassed } from '../utils';

import styles from './NotificationPanel.module.css';

import type { IconType } from 'react-icons';

const MAX_NOTIFICATIONS = 4;

const ICON_MAP: Record<NotificationType, IconType> = {
	answer: MdQuestionAnswer,
	comment: MdOutlineQuestionAnswer,
};

const TITLE_MAP: Record<NotificationType, string> = {
	answer: 'Someone answered your question',
	comment: 'Someone commented on your answer',
};

type NotificationType = 'answer' | 'comment';

type ProcessedNotification = {
	id: number;
	Icon: IconType;
	title: string;
	subtitle: string | undefined;
	time: string;
};

function getNotificationType(notification: Notification): NotificationType {
	return notification.comment !== null ? 'comment' : 'answer';
}

function processNotifications(notifications: Notification[]): ProcessedNotification[] {
	return notifications.map((notification) => {
		const type = getNotificationType(notification);
		const Icon = ICON_MAP[type];
		const title = TITLE_MAP[type];

		const questionTitle = notification.question.title;

		return {
			id: notification.id,
			Icon,
			title,
			subtitle: questionTitle,
			time: formatTimePassed(notification.createdAt),
		};
	});
}

interface NotificationPanelProps {
	notifications: Notification[];
	onViewAll: () => void;
}

const NotificationPanel = ({ notifications, onViewAll }: NotificationPanelProps) => {
	const hasNotifications = notifications.length > 0;

	const visible = notifications.slice(0, MAX_NOTIFICATIONS);
	const processedNotifications = processNotifications(visible);

	return (
		<Pane className={styles.notificationsCard}>
			<Pane className={styles.notificationsCardHeader}>
				<Heading className={styles.notificationsCardTitle}>Notifications</Heading>
			</Pane>

			<Pane className={styles.notificationsCardList}>
				{hasNotifications ? (
					processedNotifications.map(({ id, Icon, title, subtitle, time }) => (
						<Pane key={id} className={styles.notificationItem}>
							<Pane className={styles.notificationIcon}>
								<Icon className={styles.notificationIconSVG} />
							</Pane>

							<Pane className={styles.notificationContent}>
								<Text className={styles.notificationText}>
									<>
										{title}{' '}
										<span className={styles.notificationHighlight}>
											{subtitle}
										</span>
									</>
								</Text>

								<Text className={styles.notificationTime}>{time}</Text>
							</Pane>
						</Pane>
					))
				) : (
					<Pane className={styles.emptyState}>
						<Text className={styles.emptyStateText}>No notifications</Text>
					</Pane>
				)}
			</Pane>

			{hasNotifications && (
				<Button className={styles.viewAllButton} onClick={onViewAll}>
					View All
				</Button>
			)}
		</Pane>
	);
};

export default NotificationPanel;
