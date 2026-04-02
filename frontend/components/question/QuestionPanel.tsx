import { Button, Heading, Pane, Paragraph, Text, HeartIcon } from 'evergreen-ui';

import { formatTimePassed } from '../utils';
import { heartQuestion } from '../../api/heartService';

import styles from './QuestionPanel.module.css';
import { useState } from 'react';

interface QuestionPanelProps {
	user: string;
	title: string;
	tags: string[];
	details: string;
	create_time: Date;
	user_is_anonymous: boolean;
	initialHearts: number;
	initialIsHearted: boolean;
	questionId: number;
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
				<Text className={styles.metadata}>{displayInformation}</Text>
				<Paragraph className={styles.details}>{details}</Paragraph>

				<Pane className={styles.footer}>
					<Pane display="flex" flexDirection="column" alignItems="center">
						<Button
							icon={HeartIcon}
							appearance="minimal"
							height={24}
							iconSize={14}
							color={isHearted ? 'red500' : 'gray400'}
							onClick={handleHeart}
						/>
						<Text size={300} color="muted">
							{hearts}
						</Text>
					</Pane>
				</Pane>
			</Pane>
		</Pane>
	);


};

export default QuestionPanel;
