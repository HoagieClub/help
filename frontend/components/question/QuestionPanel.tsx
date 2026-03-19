import { Button, Heading, Pane, Paragraph, Text } from 'evergreen-ui';

import { formatTimePassed } from '../utils';

import styles from './QuestionPanel.module.css';

interface QuestionPanelProps {
	user: string;
	title: string;
	tags: string[];
	details: string;
	create_time: Date;
	user_is_anonymous: boolean;
	onBack: () => void;
}

function formatMetadata(
	user: string,
	tags: string[],
	create_time: Date,
	user_is_anonymous: boolean
): string {
	const displayUser = user_is_anonymous === true ? 'Anonymous' : user;
	const displayTag = tags[0];
	const displayTimePassed = formatTimePassed(create_time);

	return `${displayUser} • ${displayTag} • ${displayTimePassed}`;
}

const QuestionPanel = ({
	user,
	title,
	tags,
	details,
	create_time,
	user_is_anonymous,
	onBack,
}: QuestionPanelProps) => {
	const displayInformation = formatMetadata(user, tags, create_time, user_is_anonymous);

	return (
		<Pane className={styles.container}>
			<Pane className={styles.content}>
				<Pane className={styles.header}>
					<Heading className={styles.title}>{title}</Heading>
					<Button className={styles.backButton} onClick={onBack}>
						Back to Q&A
					</Button>
				</Pane>
				<Text className={styles.metadata}>{displayInformation}</Text>
				<Paragraph className={styles.details}>{details}</Paragraph>
			</Pane>
		</Pane>
	);
};

export default QuestionPanel;
