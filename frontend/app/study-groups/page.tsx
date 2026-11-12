/**
 * @overview Study Group page for HoagieHelp.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { getAllStudyGroup } from '@/api/studyGroupService';
import { StudyGroupCard } from '@/components/study-group/StudyGroupCard';
import { Button, EmptyState, Message, PageHeader, Spinner, Stack } from '@/components/ui';

type StudyGroup = NonNullable<Awaited<ReturnType<typeof getAllStudyGroup>>>[number];

export default function StudyGroupsPage() {
	const [studyGroups, setStudyGroups] = useState<StudyGroup[] | null | undefined>(undefined);

	useEffect(() => {
		void (async () => {
			setStudyGroups(await getAllStudyGroup());
		})();
	}, []);

	return (
		<div className='mx-auto max-w-5xl px-4 py-8'>
			<Stack gap='6'>
				<PageHeader
					title='Study Groups'
					description='Find classmates and form study groups'
					action={
						<Button asChild>
							<Link href='/study-groups/form'>Create Study Group</Link>
						</Button>
					}
				/>

				{studyGroups === undefined && <Spinner label='Loading study groups…' />}
				{studyGroups === null && (
					<Message variant='error'>
						Couldn’t load study groups. Please refresh to try again.
					</Message>
				)}
				{studyGroups?.length === 0 && (
					<EmptyState
						title='No study groups yet'
						description='Start one for your next exam.'
					/>
				)}
				{studyGroups && studyGroups.length > 0 && (
					<div className='flex flex-wrap gap-6'>
						{studyGroups.map((group) => (
							<StudyGroupCard
								key={group.id}
								title={group.title}
								description={group.description}
								// TODO: the API sends a user id, not a name.
								leader={`User ${group.leader}`}
								meetsAt={group.meeting_datetime}
								joined={group.members.length}
								spots={group.max_spots}
								// TODO: there's no join endpoint yet (see the backend tickets).
								onJoin={() => {}}
							/>
						))}
					</div>
				)}
			</Stack>
		</div>
	);
}
