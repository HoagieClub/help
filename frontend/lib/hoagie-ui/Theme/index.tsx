/**
 * @overview Theme component for the template app.
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

import { ThemeProvider } from 'evergreen-ui';

import { hoagieTemplate, hoagieUI } from './themes';

type ThemeProps = {
	// Options: "template")
	palette?: string;

	// React children (child components)
	children?: ReactNode;
};

/**
 * Theme is a theme provider meant for use throughout
 * different Hoagie applications.
 */
export function Theme({ palette = 'template', children }: ThemeProps) {
	const colorTheme = (() => {
		switch (palette) {
			case 'template':
				return hoagieTemplate;
			default:
				return hoagieUI;
		}
	})();

	return <ThemeProvider value={colorTheme}>{children}</ThemeProvider>;
}

export default Theme;
