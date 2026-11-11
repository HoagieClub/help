/**
 * @overview Names of the HoagieHelp design tokens, for TypeScript.
 *
 * Values are NOT here: they live only in app/tokens.css. This file just lists the names so
 * components, the cn() helper and the /design page agree on what exists. When you add a token
 * to tokens.css, add its name here too.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

export type ColorToken = { name: string; use: string };

export const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
	{
		title: 'Brand',
		tokens: [
			{ name: 'brand', use: 'Primary buttons, course tags, active tab' },
			{ name: 'brand-hover', use: 'Hover on brand-colored things' },
			{ name: 'brand-soft', use: 'Focus rings, light red backgrounds' },
			{ name: 'focus', use: 'Keyboard focus outline' },
		],
	},
	{
		title: 'Text and surfaces',
		tokens: [
			{ name: 'ink', use: 'Headings, names, labels, body text' },
			{ name: 'muted', use: 'Timestamps, placeholders, secondary text' },
			{ name: 'surface', use: 'Cards and the nav bar' },
			{ name: 'surface-gray', use: 'Page background, input fill' },
			{ name: 'line', use: 'Card, input and nav borders' },
			{ name: 'neutral', use: 'Topic tags, search box border' },
		],
	},
	{
		title: 'Status',
		tokens: [
			{ name: 'success', use: 'Ask Question button, category badges' },
			{ name: 'success-soft', use: 'Success message background' },
			{ name: 'warning', use: 'Warning text' },
			{ name: 'warning-soft', use: 'Warning background' },
			{ name: 'danger', use: 'Error text, destructive buttons' },
			{ name: 'danger-soft', use: 'Error background' },
		],
	},
];

export const COLOR_NAMES = COLOR_GROUPS.flatMap((g) => g.tokens.map((t) => t.name));

/** Spacing scale keys: p-4 = 16px. Only these exist. 9 is for small buttons, 20 and 28 for avatar sizes. */
export const SPACING_STEPS = ['0', '1', '2', '3', '4', '5', '6', '8', '9', '10', '15', '20', '28'] as const;
export type SpacingStep = (typeof SPACING_STEPS)[number];

export const RADIUS_NAMES = ['sm', 'md', 'card', 'tag', 'pill'] as const;

export const SHADOW_NAMES = ['card', 'card-hover', 'dropdown'] as const;

export const FONT_NAMES = ['body', 'mono'] as const;

export const HEADING_STYLES = ['h1', 'h2', 'h3', 'title'] as const;
export const TEXT_STYLES = ['body', 'body-sm', 'label', 'small', 'code'] as const;
export const TYPE_STYLES = [...HEADING_STYLES, ...TEXT_STYLES] as const;
