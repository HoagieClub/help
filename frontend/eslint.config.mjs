/**
 * @overview ESLint configurations for the Hoagie Template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
	prettier,
]);
