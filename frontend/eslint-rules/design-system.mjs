/**
 * @overview Local ESLint rules that keep code on the HoagieHelp design system.
 *
 * Every message says what to use instead and points to /design. They run as warnings while
 * existing pages are migrated. See frontend/DESIGN_SYSTEM.md.
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

/** Allowed spacing steps (app/tokens.css). Keep in sync with lib/design-tokens.ts. */
const SPACING_STEPS = [0, 1, 2, 3, 4, 6, 8, 10, 15];

const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/;

const PALETTE =
	'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const COLOR_UTILITY =
	'bg|text|border|border-[trblxy]|ring|ring-offset|outline|fill|stroke|from|via|to|divide|placeholder|accent|caret|decoration|shadow';
const DEFAULT_PALETTE = new RegExp(
	`^(?:${COLOR_UTILITY})-(?:(?:${PALETTE})-(?:50|[1-9]00|950)|white|black)(?:/\\d+)?$`
);

const LEGACY_SHADCN =
	/^(?:bg|text|border|ring)-(?:background|foreground|card|primary|primary-foreground|muted-foreground|border)$/;

const SPACING_UTILITY =
	/^-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y|w|h|size|min-w|min-h|max-w|max-h|inset|inset-x|inset-y|top|right|bottom|left|start|end|translate-x|translate-y|scroll-m[trblxy]?|scroll-p[trblxy]?|indent|basis)-(\d+(?:\.\d+)?)$/;

/** Splits a string into Tailwind class tokens without their variants (hover:, md:, !). */
function classTokens(text) {
	return text
		.split(/\s+/)
		.filter(Boolean)
		.map((raw) => {
			const parts = raw.split(/:(?![^[]*\])/);
			return { raw, variants: parts.slice(0, -1), core: parts.at(-1).replace(/^!/, '') };
		});
}

function nearestSteps(value) {
	let best = [];
	let bestDistance = Infinity;
	for (const step of SPACING_STEPS) {
		const distance = Math.abs(step - value);
		if (distance < bestDistance) {
			best = [step];
			bestDistance = distance;
		} else if (distance === bestDistance) {
			best.push(step);
		}
	}
	return best;
}

/** Calls `check(text, node)` for every string literal and template literal chunk. */
function stringVisitor(check) {
	const isModuleSource = (node) =>
		node.parent &&
		(node.parent.type === 'ImportDeclaration' ||
			node.parent.type === 'ExportNamedDeclaration' ||
			node.parent.type === 'ExportAllDeclaration' ||
			node.parent.type === 'ImportExpression');
	return {
		Literal(node) {
			if (typeof node.value === 'string' && !isModuleSource(node)) {
				check(node.value, node);
			}
		},
		TemplateElement(node) {
			check(node.value.raw, node);
		},
	};
}

const rule = (description, create) => ({
	meta: { type: 'suggestion', docs: { description }, schema: [] },
	create,
});

const designSystem = {
	meta: { name: 'design-system' },
	rules: {
		'no-hex-colors': rule('Disallow hex color literals', (context) =>
			stringVisitor((text, node) => {
				const match = text.match(HEX);
				if (match) {
					context.report({
						node,
						message: `Hex color ${match[0]}: use a brand color token instead, e.g. bg-brand, text-muted, border-line (or var(--brand) in CSS). ${DOCS}`,
					});
				}
			})
		),

		'no-arbitrary-values': rule('Disallow arbitrary Tailwind values like p-[13px]', (context) =>
			stringVisitor((text, node) => {
				for (const token of classTokens(text)) {
					// Only the value counts: arbitrary variants like group-[.toaster]: aren't values.
					const arbitrary =
						/-\[[^\]]+\]/.test(token.core) || /^\[[^\]]+\]$/.test(token.core);
					if (arbitrary) {
						context.report({
							node,
							message: `Arbitrary Tailwind value "${token.raw}": use a token class instead (spacing p-1…p-15, rounded-sm/md/tag/card/pill, text-body, bg-brand…). If nothing fits, ask to add a token. ${DOCS}`,
						});
					}
				}
			})
		),

		'no-default-palette': rule("Disallow Tailwind's default color palette", (context) =>
			stringVisitor((text, node) => {
				for (const token of classTokens(text)) {
					if (DEFAULT_PALETTE.test(token.core)) {
						context.report({
							node,
							message: `"${token.raw}" is Tailwind's default palette, not our brand: use a brand color like text-ink, text-muted, bg-surface, bg-surface-gray, border-line or bg-brand. ${DOCS}`,
						});
					}
				}
			})
		),

		'no-legacy-shadcn-colors': rule('Disallow deprecated shadcn color classes', (context) =>
			stringVisitor((text, node) => {
				for (const token of classTokens(text)) {
					if (LEGACY_SHADCN.test(token.core)) {
						context.report({
							node,
							message: `"${token.raw}" is a deprecated shadcn color: use a brand color (bg-surface, text-ink, text-muted, border-line, bg-brand). ${DOCS}`,
						});
					}
				}
			})
		),

		'no-off-scale-spacing': rule(
			'Disallow spacing values outside the 4px token scale',
			(context) =>
				stringVisitor((text, node) => {
					for (const token of classTokens(text)) {
						const match = token.core.match(SPACING_UTILITY);
						if (!match) {
							continue;
						}
						const [, utility, value] = match;
						const number = Number(value);
						if (SPACING_STEPS.includes(number)) {
							continue;
						}
						const negative = token.core.startsWith('-') ? '-' : '';
						const suggestion = nearestSteps(number)
							.map((step) => `${negative}${utility}-${step}`)
							.join(' or ');
						const sizeHint = /^(w|h|size|min-w|min-h|max-w|max-h|basis)$/.test(utility)
							? ' For widths and heights, a layout class like w-full or max-w-md may fit better.'
							: '';
						context.report({
							node,
							message: `"${token.raw}" is off the spacing scale (allowed: ${SPACING_STEPS.join(', ')}). Nearest: ${suggestion}.${sizeHint} ${DOCS}`,
						});
					}
				})
		),

		'no-inline-style': rule('Disallow style={{}} props', (context) => ({
			JSXAttribute(node) {
				if (node.name.type === 'JSXIdentifier' && node.name.name === 'style') {
					context.report({
						node,
						message: `Inline style prop: use a components/ui component prop (Stack gap, Card padding, Text variant…) or token classes instead. ${DOCS}`,
					});
				}
			},
		})),
	},
};

export default designSystem;
