import React, { useState } from 'react';

import { Button, Heading, Pane, Paragraph, Text, TextInput } from 'evergreen-ui';
import { useRouter } from 'next/navigation';

import { createNewAnswer } from '../../api/answerService';
import { formatTimePassed } from '../utils';

import styles from './QuestionPanel.module.css';

interface QuestionPanelProps {
	questionId: number;
	user: string;
	title: string;
	tags: string[];
	details: string;
	create_time: Date;
	user_is_anonymous: boolean;
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
	questionId,
	user,
	title,
	tags,
	details,
	create_time,
	user_is_anonymous,
}: QuestionPanelProps) => {
	const displayInformation = formatMetadata(user, tags, create_time, user_is_anonymous);

	const router = useRouter();

	const [showAnswerBox, setShowAnswerBox] = useState(false);

	const handleAnswer = () => {
		setShowAnswerBox(true);
	};

	const [answer, setAnswer] = useState('');

	const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value);
		await createNewAnswer(questionId, {
			content: event.target.value,
			user_is_anonymous,
		});
	};

	return (
		<Pane className={styles.container}>
			<Pane className={styles.content}>
				<Pane className={styles.header}>
					<Heading className={styles.title}>{title}</Heading>
					<Button
						className={styles.button}
						onClick={() => {
							router.push('/questions');
						}}
					>
						Back to Q&A
					</Button>
				</Pane>
				<Text className={styles.metadata}>{displayInformation}</Text>
				<Paragraph className={styles.details}>{details}</Paragraph>
				{!showAnswerBox && (
					<Button className={styles.button} onClick={handleAnswer}>
						Answer
					</Button>
				)}
				{showAnswerBox && (
					<>
						<TextInput
							className={styles.answerBox}
							placeholder='Write your answer here...'
							value={answer}
							onChange={handleSubmit}
						/>
						<Button className={styles.button} onClick={handleSubmit}>
							Submit
						</Button>
					</>
				)}
			</Pane>
		</Pane>
	);
};

export default QuestionPanel;
