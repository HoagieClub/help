/**
 * @overview Stylelint for CSS modules (*.module.css): flags raw colors and px values.
 *
 * Warnings while existing styles are migrated. Use the tokens from app/tokens.css instead,
 * e.g. color: var(--brand); padding: var(--space-4). See /design and frontend/DESIGN_SYSTEM.md.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

const DOCS = 'See /design and frontend/DESIGN_SYSTEM.md.';

/** @type {import('stylelint').Config} */
const config = {
	plugins: ['stylelint-declaration-strict-value'],
	ignoreFiles: ['.next/**', 'node_modules/**'],
	defaultSeverity: 'warning',
	rules: {
		// Colors must come from tokens: var(--brand), var(--ink), var(--line)…
		'scale-unlimited/declaration-strict-value': [
			['/color$/', 'fill', 'stroke', 'background', 'box-shadow'],
			{
				ignoreValues: [
					'currentColor',
					'currentcolor',
					'transparent',
					'inherit',
					'initial',
					'unset',
					'none',
					'0',
				],
				ignoreFunctions: false,
				message: `Raw color: use a token like var(--brand), var(--ink), var(--muted) or var(--line). ${DOCS}`,
			},
		],
		// Sizes must come from tokens: var(--space-4), or rem for type. 1px borders are fine.
		'unit-disallowed-list': [
			['px'],
			{
				ignoreProperties: {
					px: [
						'/^border(-(top|right|bottom|left))?(-width)?$/',
						'/^outline(-width)?$/',
						'/^outline-offset$/',
					],
				},
				message: `Raw px value: use a spacing token like var(--space-4) (4px grid: 1, 2, 3, 4, 6, 8, 10, 15). ${DOCS}`,
			},
		],
	},
};

export default config;
