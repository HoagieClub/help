import { Pane, Heading, Button, Text } from 'evergreen-ui';
import { MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md';

import type { Answer, Notification } from '@/types';

import styles from './NotificationPanel.module.css';

const MAX_NOTIFICATIONS = 4;

function isAnswer(notification: Notification): notification is Answer {
	return 'question' in notification;
}

function formatTimePassed(dateString: string): string {
	const now = new Date().getTime();
	const past = new Date(dateString).getTime();
	const diff = Math.floor((now - past) / 1000);

	if (diff < 60) return 'just now';

	const minutes = Math.floor(diff / 60);
	if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;

	const days = Math.floor(hours / 24);
	return `${days} day${days > 1 ? 's' : ''} ago`;
}

interface NotificationPanelProps {
	notifications: Notification[];
	onViewAll: () => void;
}

const NotificationPanel = ({ notifications, onViewAll }: NotificationPanelProps) => {
	const visible = notifications.slice(0, MAX_NOTIFICATIONS);
	const hasNotifications = notifications.length > 0;

	return (
		<Pane className={styles.notificationsCard}>
			<Pane className={styles.notificationsCardHeader}>
				<Heading className={styles.notificationsCardTitle}>Notifications</Heading>
			</Pane>

			<Pane className={styles.notificationsCardList}>
				{hasNotifications ? (
					visible.map((notification) => (
						<Pane key={notification.id} className={styles.notificationItem}>
							<Pane className={styles.notificationIcon}>
								{isAnswer(notification) ? (
									<MdQuestionAnswer className={styles.notificationIconSVG} />
								) : (
									<MdOutlineQuestionAnswer
										className={styles.notificationIconSVG}
									/>
								)}
							</Pane>

							<Pane className={styles.notificationContent}>
								<Text className={styles.notificationText}>
									{isAnswer(notification) ? (
										<>
											Someone answered your question{' '}
											<span className={styles.notificationHighlight}>
												{notification.text}
											</span>
										</>
									) : (
										<>
											Someone responded to your answer{' '}
											<span className={styles.notificationHighlight}>
												{notification.text}
											</span>
										</>
									)}
								</Text>

								<Text className={styles.notificationTime}>
									{formatTimePassed(notification.createdAt)}
								</Text>
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
