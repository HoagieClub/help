/**
 * StudyGroupCard Component
 * ------------------------
 * A reusable React component that displays information about a study group in a clean, card-style layout.
 *
 * Features:
 * - Shows the study group's title, description, leader, date/time, and available spots.
 * - Includes icons for visual clarity using React Icons.
 * - Formats date and time in a readable, localized format (e.g., "Oct 25, 2025 · 4:00 PM").
 * - Provides a "Join" button that triggers a callback function (onJoin) passed via props.
 *
 * This component is styled using a CSS module for scoped and maintainable styles.
 *
 */

import { BsFillPersonFill } from 'react-icons/bs';
import { FaRegCalendar } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { MdOutlinePeople } from 'react-icons/md';

import styles from './StudyGroupCard.module.css';

interface StudyGroupCardProps {
	title: string;
	description: string;
	groupLeader: string;
	dateTime: Date;
	spots: string;
	onJoin: () => void;
}

const StudyGroupCard = ({
	title,
	description,
	groupLeader,
	dateTime,
	spots,
	onJoin,
}: StudyGroupCardProps) => {
	const parts = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	}).formatToParts(dateTime);

	const monthDay = `${parts.find((p) => p.type === 'month')?.value} ${parts.find((p) => p.type === 'day')?.value}`;
	const year = parts.find((p) => p.type === 'year')?.value;
	const time = `${parts.find((p) => p.type === 'hour')?.value}:${parts.find((p) => p.type === 'minute')?.value} ${parts.find((p) => p.type === 'dayPeriod')?.value.toUpperCase()}`;
	const displayDateTime = `${monthDay}, ${year} · ${time}`;

	return (
		<div className={styles.card}>
			<div className={styles.strip} />
			<div className={styles.content}>
				<p className={styles.tag}>STUDY GROUP</p>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>

				<hr className={styles.divider} />

				<p className={`${styles.iconText} ${styles.dark}`} style={{ marginBottom: '2px' }}>
					<BsFillPersonFill className={styles.icon} />
					Group Leader: {groupLeader}
				</p>

				<p
					className={`${styles.iconText} ${styles.light}`}
					style={{ marginBottom: '25px' }}
				>
					<FaRegCalendar className={styles.icon} />
					{displayDateTime}
				</p>

				<div className={styles.footer}>
					<p className={styles.joined}>
						<MdOutlinePeople className={styles.icon} />
						{spots} Available Spots
					</p>

					<button className={styles.joinButton} onClick={onJoin}>
						<FaPlus className={styles.joinIcon} />
						Join
					</button>
				</div>
			</div>
		</div>
	);
};

export default StudyGroupCard;
