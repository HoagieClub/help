'use client';

import Link from 'next/link';

import {
	StudyGroupDisplayCard,
	type StudyGroupDisplayAttendee,
} from '@/components/StudyGroupsDashboard/StudyGroupDisplayCard';

export interface StudyGroupDashboardDatum {
	id: string;
	title: string;
	category: string;
	description: string;
	dateTime: Date;
	location: string;
	attendeeCount: number;
	capacity: number;
	attendees: StudyGroupDisplayAttendee[];
}

const CATEGORIES = [
	'All Groups',
	'Science',
	'Mathematics',
	'Humanities',
	'Engineering',
	'Social Sciences',
] as const;

const DUMMY_STUDY_GROUPS: StudyGroupDashboardDatum[] = [
	{
		id: '1',
		title: 'COS 226 Study Group',
		category: 'Algorithms',
		description:
			'Deep dive into graph algorithms and data structures. Preparing for upcoming quiz on shortest paths and minimum spanning trees.',
		dateTime: new Date('2025-03-28T18:00:00'),
		location: 'Fine Library, Room 304',
		attendeeCount: 12,
		capacity: 15,
		attendees: [
			{ initials: 'SC' },
			{ initials: 'JD' },
			{ initials: 'ES' },
			{ initials: 'MK' },
			{ initials: 'AL' },
		],
	},
	{
		id: '2',
		title: 'Quantum Physics Problem Set',
		category: 'Physics',
		description:
			'Work through problem set 4 on quantum mechanics. Focus on Schrödinger equation and wave functions.',
		dateTime: new Date('2025-03-29T14:00:00'),
		location: 'Lewis Library, Room 120',
		attendeeCount: 8,
		capacity: 12,
		attendees: [{ initials: 'RJ' }, { initials: 'PT' }, { initials: 'KW' }],
	},
	{
		id: '3',
		title: 'ECO 100 Review Session',
		category: 'Economics',
		description:
			'Review microeconomics concepts for the midterm. Supply and demand, elasticity, and consumer choice.',
		dateTime: new Date('2025-03-30T16:00:00'),
		location: 'Robertson Hall, Room 100',
		attendeeCount: 18,
		capacity: 20,
		attendees: [
			{ initials: 'AB' },
			{ initials: 'CD' },
			{ initials: 'EF' },
			{ initials: 'GH' },
		],
	},
	{
		id: '4',
		title: 'MAT 202 Linear Algebra',
		category: 'Mathematics',
		description:
			'Eigenvalues, eigenvectors, and diagonalization. Bring your problem sets.',
		dateTime: new Date('2025-03-31T17:30:00'),
		location: 'Fine Hall, Room 214',
		attendeeCount: 15,
		capacity: 15,
		attendees: [{ initials: 'LM' }, { initials: 'NO' }, { initials: 'PQ' }],
	},
	{
		id: '5',
		title: 'Organic Chemistry Mechanisms',
		category: 'Chemistry',
		description:
			'Review key reaction mechanisms for CHM 303. SN1, SN2, E1, E2 and synthesis strategies.',
		dateTime: new Date('2025-04-01T19:00:00'),
		location: 'Frick Chemistry Lab, Room 132',
		attendeeCount: 6,
		capacity: 10,
		attendees: [{ initials: 'RS' }, { initials: 'TU' }],
	},
	{
		id: '6',
		title: 'Machine Learning Study Group',
		category: 'Computer Science',
		description:
			'Implement and debug assignment 3 (neural networks). PyTorch and backpropagation.',
		dateTime: new Date('2025-04-02T15:00:00'),
		location: 'Computer Science Building, Room 105',
		attendeeCount: 4,
		capacity: 5,
		attendees: [{ initials: 'VW' }, { initials: 'XY' }],
	},
];

/**
 * Dashboard layout for study groups: header with Create button, search, date and category filters, and card grid.
 * Styled with Tailwind CSS. Search and filters are non-functional for the moment.
 */
export function StudyGroupsDashboard() {
	return (
		<div className="mx-auto max-w-6xl px-6 pt-8 pb-12">
			{/* Header: title + subtitle on left, Create button on right */}
			<div className="mb-10 flex flex-wrap items-start justify-between gap-6">
				<div>
					<h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
						Study Groups
					</h1>
					<p className="text-base text-gray-500">
						Collaborate with peers on coursework and exam preparation
					</p>
				</div>
				<Link
					href="/study-groups/form"
					className="shrink-0 rounded-lg bg-[#EF4343] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#d63c3c]"
				>
					Create Study Group
				</Link>
			</div>

			{/* Search + Date row */}
			<div className="mb-6 flex flex-wrap gap-4">
				<div className="relative min-w-[240px] flex-1">
					<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</span>
					<input
						type="search"
						placeholder="Search study groups..."
						readOnly
						className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
					/>
				</div>
				<select
					disabled
					className="h-10 w-36 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
				>
					<option value="any">Date</option>
					<option value="week">This week</option>
					<option value="month">This month</option>
				</select>
			</div>

			{/* Category filter pills (non-functional) */}
			<div className="mb-8 flex flex-wrap gap-2">
				{CATEGORIES.map((cat) => (
					<button
						key={cat}
						type="button"
						disabled
						className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
					>
						{cat}
					</button>
				))}
			</div>

			{/* Cards grid */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{DUMMY_STUDY_GROUPS.map((group) => (
					<StudyGroupDisplayCard
						key={group.id}
						title={group.title}
						category={group.category}
						description={group.description}
						dateTime={group.dateTime}
						location={group.location}
						attendeeCount={group.attendeeCount}
						capacity={group.capacity}
						attendees={group.attendees}
						onJoin={() => {}}
					/>
				))}
			</div>
		</div>
	);
}
