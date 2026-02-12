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

import { StudyGroupsDashboard } from '@/components/StudyGroupsDashboard';

/**
 * Study Groups page: find classmates and create study groups.
 */
export function StudyGroups() {
	return (
		<div className="min-h-screen border-t-4 border-b-4 border-sky-200 bg-white">
			<StudyGroupsDashboard />
		</div>
	);
}

export default StudyGroups;
