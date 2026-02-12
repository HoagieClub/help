/**
 * Display card for the study groups dashboard: title, category tag, description,
 * date/time, location, attendee count with avatars, and Join Group button.
 * Styled with Tailwind CSS.
 */

import { FaRegCalendar } from 'react-icons/fa';
import { MdOutlineLocationOn, MdOutlinePeople } from 'react-icons/md';

export interface StudyGroupDisplayAttendee {
	initials?: string;
	imageUrl?: string;
}

export interface StudyGroupDisplayCardProps {
	title: string;
	category: string;
	description: string;
	dateTime: Date;
	location: string;
	attendeeCount: number;
	capacity: number;
	attendees: StudyGroupDisplayAttendee[];
	onJoin: () => void;
}

function formatDateTime(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	}).format(date);
}

const MAX_VISIBLE_AVATARS = 3;

export function StudyGroupDisplayCard({
	title,
	category,
	description,
	dateTime,
	location,
	attendeeCount,
	capacity,
	attendees,
	onJoin,
}: StudyGroupDisplayCardProps) {
	const displayDate = formatDateTime(dateTime);
	const overflowCount = Math.max(0, attendees.length - MAX_VISIBLE_AVATARS);
	const visibleAttendees = attendees.slice(0, MAX_VISIBLE_AVATARS);

	return (
		<div className="flex h-full w-full max-w-[360px] flex-col gap-3 rounded-lg bg-white p-5 text-left shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
			<div className="flex items-start justify-between gap-3">
				<h2 className="min-w-0 flex-1 text-lg font-bold leading-tight text-gray-900">
					{title}
				</h2>
				<span className="shrink-0 rounded-full bg-[#16A249] px-2.5 py-1 text-xs font-semibold text-white">
					{category}
				</span>
			</div>
			<p className="line-clamp-2 text-sm leading-snug text-gray-500">
				{description}
			</p>
			<p className="flex items-center gap-2 text-[13px] text-gray-500">
				<FaRegCalendar className="shrink-0 text-base text-gray-400" aria-hidden />
				{displayDate}
			</p>
			<p className="flex items-center gap-2 text-[13px] text-gray-500">
				<MdOutlineLocationOn
					className="shrink-0 text-base text-gray-400"
					aria-hidden
				/>
				{location}
			</p>
			<div className="mt-1 flex items-center justify-between gap-3">
				<span className="flex items-center gap-1.5 text-[13px] text-gray-500">
					<MdOutlinePeople
						className="shrink-0 text-base text-gray-400"
						aria-hidden
					/>
					{capacity > 0
						? `${attendeeCount} / ${capacity} attending`
						: `${attendeeCount} attending`}
				</span>
				<div className="flex items-center [&>*]:-ml-1.5 [&>*:first-child]:ml-0">
					{visibleAttendees.map((a, i) =>
						a.imageUrl ? (
							<div
								key={i}
								className="h-7 w-7 shrink-0 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center bg-no-repeat"
								style={{ backgroundImage: `url(${a.imageUrl})` }}
								title={a.initials}
							/>
						) : (
							<div
								key={i}
								className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[10px] font-semibold text-gray-700"
								title={a.initials}
							>
								{a.initials ?? '?'}
							</div>
						),
					)}
					{overflowCount > 0 && (
						<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-[11px] font-semibold text-gray-700">
							+{overflowCount}
						</div>
					)}
				</div>
			</div>
			<button
				type="button"
				className="mt-auto w-full rounded-lg bg-[#EF4343] px-4 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#d63c3c]"
				onClick={onJoin}
			>
				Join Group
			</button>
		</div>
	);
}
