/**
 * @overview Utility functions for the Help app.
 *
 * This module provides utility functions that simplify class name manipulation and merging.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import {
	COLOR_NAMES,
	FONT_NAMES,
	RADIUS_NAMES,
	SHADOW_NAMES,
	SPACING_STEPS,
	TYPE_STYLES,
} from '@/lib/design-tokens';

/**
 * tailwind-merge only knows Tailwind's default names. Teach it our tokens so it knows that
 * `text-body` is a font size and `text-ink` is a color (otherwise it would drop one of them).
 */
const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			color: [...COLOR_NAMES],
			text: [...TYPE_STYLES],
			font: [...FONT_NAMES],
			radius: [...RADIUS_NAMES],
			shadow: [...SHADOW_NAMES],
			spacing: [...SPACING_STEPS],
		},
	},
});

/**
 * Utility function to combine and merge Tailwind CSS class names.
 *
 * This function uses `clsx` to conditionally join class names together and
 * `twMerge` to ensure Tailwind CSS class conflicts are properly handled
 * (e.g., merging duplicate utility classes).
 *
 * @param {...ClassValue[]} inputs - A variadic list of class values to be processed. These can be
 * strings, arrays, objects, or any class names conditionally applied.
 *
 * @returns {string} The final merged class name string that can be applied to a component.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
