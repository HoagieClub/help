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
			{ name: 'brand', use: 'Primary buttons, links, selected states' },
			{ name: 'brand-hover', use: 'Hover on brand-colored things' },
			{ name: 'brand-deep', use: 'Pressed state, text on brand-soft' },
			{ name: 'brand-bright', use: 'Display text 24px and up only' },
			{ name: 'brand-soft', use: 'Soft fills, focus rings' },
			{ name: 'brand-wash', use: 'Large light backgrounds' },
			{ name: 'brand-tint', use: 'Hover background for minimal buttons' },
			{ name: 'focus', use: 'Keyboard focus outline' },
		],
	},
	{
		title: 'Text and surfaces',
		tokens: [
			{ name: 'ink', use: 'Default text' },
			{ name: 'heading', use: 'Headings' },
			{ name: 'muted', use: 'Secondary text, timestamps' },
			{ name: 'placeholder', use: 'Input placeholder text' },
			{ name: 'surface', use: 'Cards, inputs, page content' },
			{ name: 'surface-gray', use: 'Subtle gray backgrounds' },
			{ name: 'line', use: 'Card and section borders' },
			{ name: 'line-neutral', use: 'Neutral dividers' },
			{ name: 'control-border', use: 'Input and secondary button borders' },
		],
	},
	{
		title: 'Status',
		tokens: [
			{ name: 'success', use: 'Success text' },
			{ name: 'success-soft', use: 'Success background' },
			{ name: 'warning', use: 'Warning text' },
			{ name: 'warning-soft', use: 'Warning background' },
			{ name: 'danger', use: 'Errors, destructive buttons' },
			{ name: 'danger-soft', use: 'Error background' },
		],
	},
	{
		title: 'Club and mascot',
		tokens: [
			{ name: 'club-purple', use: 'Hoagie Club accents' },
			{ name: 'mascot-mint', use: 'Fills only, never text' },
			{ name: 'mascot-orange', use: 'Fills only, never text' },
		],
	},
];

export const COLOR_NAMES = COLOR_GROUPS.flatMap((g) => g.tokens.map((t) => t.name));

/** Spacing scale keys: p-4 = 16px. Only these exist. */
export const SPACING_STEPS = ['0', '1', '2', '3', '4', '6', '8', '10', '15'] as const;
export type SpacingStep = (typeof SPACING_STEPS)[number];

export const RADIUS_NAMES = ['sm', 'md', 'tag', 'card', 'pill'] as const;

export const SHADOW_NAMES = ['card-hover', 'dropdown', 'dialog'] as const;

export const FONT_NAMES = ['heading', 'body', 'mono'] as const;

export const HEADING_STYLES = ['display', 'h1', 'h2', 'h3'] as const;
export const TEXT_STYLES = [
	'lead',
	'body-lg',
	'body',
	'label',
	'small',
	'caption',
	'eyebrow',
	'code',
] as const;
export const TYPE_STYLES = [...HEADING_STYLES, ...TEXT_STYLES] as const;
