import { Pane, Heading, Button, Text } from 'evergreen-ui';
import { MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md';

import { getQuestionDetails } from '@/api/questionService';
import type { Notification } from '@/types';

import { formatTimePassed } from '../utils';

import styles from './NotificationPanel.module.css';

import type { IconType } from 'react-icons';



const MAX_NOTIFICATIONS = 4;

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

function getNotificationConfig(type: NotificationType): {
	Icon: IconType;
	title: string;
} {
	const iconMap: Record<NotificationType, IconType> = {
		answer: MdQuestionAnswer,
		comment: MdOutlineQuestionAnswer,
	};

	const titleMap: Record<NotificationType, string> = {
		answer: 'Someone answered your question',
		comment: 'Someone commented on your answer',
	};

	return {
		Icon: iconMap[type],
		title: titleMap[type],
	};
}

async function processNotifications(
	notifications: Notification[]
): Promise<ProcessedNotification[]> {
	return Promise.all(
		notifications.map(async (notification) => {
			const type = getNotificationType(notification);
			const { Icon, title } = getNotificationConfig(type);

			const question = await getQuestionDetails(notification.question.toString());
			const questionTitle = question?.title;

			return {
				id: notification.id,
				Icon,
				title,
				subtitle: questionTitle,
				time: formatTimePassed(notification.createdAt),
			};
		})
	);
}

interface NotificationPanelProps {
	notifications: Notification[];
	onViewAll: () => void;
}

const NotificationPanel = async ({ notifications, onViewAll }: NotificationPanelProps) => {
	const hasNotifications = notifications.length > 0;

	const visible = notifications.slice(0, MAX_NOTIFICATIONS);
	const processedNotifications = await processNotifications(visible);

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
										{title}
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
