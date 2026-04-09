import { useState } from 'react';

import { IconButton, Button, Heading, Pane, Paragraph, Text, HeartIcon, majorScale } from 'evergreen-ui';

import { heartQuestion } from '../../api/heartService';
import { formatTimePassed } from '../utils';

import styles from './QuestionPanel.module.css';

interface QuestionPanelProps {
	user: string;
	title: string;
	tags: string[];
	details: string;
	create_time: Date;
	user_is_anonymous: boolean;
	initialHearts: number;
	initialIsHearted: boolean;
	questionId: string;
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
	initialHearts,
	initialIsHearted,
	questionId,
	onBack,
}: QuestionPanelProps) => {
	const displayInformation = formatMetadata(user, tags, create_time, user_is_anonymous);
	const [hearts, setHearts] = useState(initialHearts);
	const [isHearted, setIsHearted] = useState(initialIsHearted);

	async function handleHeart() {
		const response = await heartQuestion(questionId);
		if (response) {
			setHearts(response.hearts);
			setIsHearted(response.is_hearted);
		}
	}

	return (
		<Pane className={styles.container}>
			<Pane className={styles.content}>
				<Pane className={styles.header}>
					<Heading className={styles.title}>{title}</Heading>
					<Button className={styles.backButton} onClick={onBack}>
						Back to Q&A
					</Button>
				</Pane>
				<Pane display="flex" alignItems="center" gap = {majorScale(2)} marginBottom={majorScale(2)}>
					<Pane display="flex" flexDirection="column" justifyContent="center" alignItems="center">
						<IconButton
							icon={<HeartIcon size={majorScale(4)} />}
							appearance='minimal'
							height={majorScale(4)}
							color={isHearted ? 'red500' : 'gray400'}
							onClick={handleHeart}
						/>
						<Text size={300}>{hearts}</Text>
					</Pane>
					<Pane display="flex" flexDirection="column" justifyContent="center">
						<Text className={styles.metadata}>{displayInformation}</Text>
					</Pane>
				</Pane>
				<Paragraph className={styles.details}>{details}</Paragraph>
			</Pane>
		</Pane>
	);
};

export default QuestionPanel;
