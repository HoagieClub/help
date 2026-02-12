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

function formatTimePassed(input: Date | string | number): string {
	const now = Date.now();
	const past = new Date(input).getTime();

	const diffMs = now - past;
	if (diffMs < 0) return 'just now';

	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (seconds < 60) return 'just now';
	if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
	if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
	if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
	if (weeks < 4) return `${weeks} wk${weeks === 1 ? '' : 's'} ago`;
	if (months < 12) return `${months} mo${months === 1 ? '' : 's'} ago`;

	return `${years} yr${years === 1 ? '' : 's'} ago`;
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
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h2 className={styles.title}>{title}</h2>
					<button className={styles.backButton} onClick={onBack}>
						Back to Q&A
					</button>
				</div>
				<p className={styles.metadata}>{displayInformation}</p>
				<p className={styles.details}>{details}</p>
			</div>
		</div>
	);
};

export default QuestionPanel;
