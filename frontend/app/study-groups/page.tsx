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

import { Button, Heading, Pane, Text, majorScale, useTheme } from 'evergreen-ui';
import Link from 'next/link';

import { getAllStudyGroup } from '@/api/studyGroupService';
import StudyGroupCard from '@/components/StudyGroupCard/StudyGroupCard';

export function StudyGroups() {
	const theme = useTheme();
	const [studyGroups, setStudyGroups] =
		useState<Awaited<ReturnType<typeof getAllStudyGroup>>>(null);

	useEffect(() => {
		getAllStudyGroup().then(setStudyGroups);
	}, []);

	return (
		<Pane
			maxWidth={majorScale(100)}
			marginX='auto'
			padding={majorScale(2)}
			marginTop={majorScale(8)}
		>
			<Heading size={900} marginBottom={8}>
				Study Groups
			</Heading>

			<Text size={500}>Find classmates and form study groups</Text>

			<Pane display='flex' gap={majorScale(2)} marginY={majorScale(3)}>
				<Link href='/study-groups/form'>
					<Button
						appearance='primary'
						backgroundColor={theme.colors.red500}
						color='black'
					>
						Create Study Group
					</Button>
				</Link>
			</Pane>

			<Pane display='flex' flexWrap='wrap' gap={majorScale(3)}>
				{studyGroups === null ? (
					<Text>Loading study groups...</Text>
				) : studyGroups.length === 0 ? (
					<Text>No study groups found.</Text>
				) : (
					studyGroups.map((group) => (
						<StudyGroupCard
							key={group.id}
							title={group.title}
							description={group.description}
							groupLeader={String(group.leader)}
							dateTime={new Date(group.meeting_datetime)}
							joinedCount={group.members.length}
							totalSpots={group.max_spots}
							onJoin={() => {}}
						/>
					))
				)}
			</Pane>
		</Pane>
	);
}

export default StudyGroups;
