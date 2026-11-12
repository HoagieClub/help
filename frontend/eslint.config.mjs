/**
 * @overview ESLint configurations for the Hoagie Help app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import designSystem from './eslint-rules/design-system.mjs';

export default defineConfig([
	...nextVitals,
	...nextTs,
	eslint.configs.recommended,
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
		'node_modules/**',
		'dist/**',
		'coverage/**',
		'.git/**',
		'next.config.mjs',
	]),
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: {
			import: importPlugin,
			react: react,
			'react-hooks': reactHooks,
		},
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			// React rules
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/self-closing-comp': 'error',
			'react/jsx-curly-brace-presence': ['error', 'never'],

			// TypeScript rules
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',

			// Import rules
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					pathGroups: [
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '@/**',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '~/**',
							group: 'internal',
							position: 'before',
						},
					],
					pathGroupsExcludedImportTypes: ['react', 'builtin'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-duplicates': 'error',
			'import/no-cycle': 'warn',

			// General rules
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-unused-vars': 'off', // Handled by TypeScript
			'no-var': 'error',
			'prefer-const': 'error',
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			curly: ['error', 'all'],
			'no-nested-ternary': 'warn',
			'no-unneeded-ternary': 'error',
			'spaced-comment': ['error', 'always', { markers: ['/'] }],
		},
	},
	// Design system (see DESIGN_SYSTEM.md and /design). Warnings while pages are migrated.
	{
		files: ['**/*.{ts,tsx}'],
		plugins: { 'design-system': designSystem },
		rules: {
			'design-system/no-hex-colors': 'warn',
			'design-system/no-arbitrary-values': 'warn',
			'design-system/no-default-palette': 'warn',
			'design-system/no-legacy-shadcn-colors': 'warn',
			'design-system/no-off-scale-spacing': 'warn',
			'design-system/no-inline-style': 'warn',
		},
	},
	// Component conventions (see "Writing a component" in DESIGN_SYSTEM.md). Errors: components/
	// and hooks/ are fully migrated, so new code there must follow them.
	{
		files: ['components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
		rules: {
			'import/no-default-export': 'error',
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'evergreen-ui',
							message:
								'Build components from @/components/ui instead of Evergreen. See DESIGN_SYSTEM.md.',
						},
					],
					patterns: [
						{
							group: [
								'@mui/icons-material',
								'@mui/icons-material/*',
								'react-icons',
								'react-icons/*',
								'@phosphor-icons/*',
							],
							message: 'Use icons from lucide-react only. See DESIGN_SYSTEM.md.',
						},
					],
				},
			],
			'no-restricted-syntax': [
				'error',
				{
					selector:
						"TSTypeReference[typeName.right.name='FC'], TSTypeReference[typeName.name='FC']",
					message:
						'Write `export function Thing({ … }: ThingProps)` instead of React.FC. See DESIGN_SYSTEM.md.',
				},
			],
		},
	},
	{
		// Feature components get data through props and hooks; only hooks call the API.
		files: ['components/**/*.{ts,tsx}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'evergreen-ui',
							message:
								'Build components from @/components/ui instead of Evergreen. See DESIGN_SYSTEM.md.',
						},
					],
					patterns: [
						{
							group: [
								'@mui/icons-material',
								'@mui/icons-material/*',
								'react-icons',
								'react-icons/*',
								'@phosphor-icons/*',
							],
							message: 'Use icons from lucide-react only. See DESIGN_SYSTEM.md.',
						},
						{
							group: ['@/api/*', '../api/*', '../../api/*'],
							message:
								"Components don't call the API directly: use or add a hook in hooks/ (e.g. useUpvote). See DESIGN_SYSTEM.md.",
						},
					],
				},
			],
		},
	},
	{
		// components/ and hooks/ are fully on the design system; keep them that way.
		files: ['components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
		rules: {
			'design-system/no-hex-colors': 'error',
			'design-system/no-arbitrary-values': 'error',
			'design-system/no-default-palette': 'error',
			'design-system/no-legacy-shadcn-colors': 'error',
			'design-system/no-off-scale-spacing': 'error',
			'design-system/no-inline-style': 'error',
		},
	},
	{
		// The Evergreen theme maps Evergreen's own color scales; brand colors there already use tokens.
		files: ['lib/hoagie-ui/Theme/themes.tsx'],
		rules: { 'design-system/no-hex-colors': 'off' },
	},
	prettier,
]);
