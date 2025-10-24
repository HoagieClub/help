/**
 * @overview Type definitions for the template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import 'evergreen-ui';

declare module 'evergreen-ui' {
	interface DefaultTheme {
		title: string;
	}
}

export type HoagieUser = {
	name?: string;
	email?: string;
};
