/**
 * @overview Global pane layout to be used in @/app/layout.tsx
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import type { ReactNode } from 'react';

import { Pane } from 'evergreen-ui';

import Footer from '@/lib/hoagie-ui/Footer';
import { hoagieTemplate } from '@/lib/hoagie-ui/Theme/themes';

export function Layout({ children }: { children: ReactNode }) {
	const theme = hoagieTemplate;
	return (
		<Pane
			display='flex'
			flexDirection='column'
			minHeight='100vh'
			background={theme.colors.teal100}
		>
			<Pane flex='1'>{children}</Pane>
			<Pane>
				<Footer />
			</Pane>
		</Pane>
	);
}

export default Layout;
