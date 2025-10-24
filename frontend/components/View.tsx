/**
 * @overview Simple styling component to ensure the layout is consistent.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import type { ReactNode } from 'react';

import { Pane } from 'evergreen-ui';

// View is an extremely simple component to make sure that the layout is consistent
export function View({ children }: { children: ReactNode }) {
	return (
		<Pane
			display='flex'
			justifyContent='center'
			alignItems='center'
			marginX='8px'
			paddingBottom='24px'
			paddingTop='64px'
		>
			<Pane
				borderRadius={8}
				textAlign='left'
				elevation={1}
				background='white'
				marginX='18px'
				maxWidth='600px'
				width='100%'
				paddingX='32px'
				paddingTop='8px'
				paddingBottom='24px'
			>
				{children}
			</Pane>
		</Pane>
	);
}

export default View;
