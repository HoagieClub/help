'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';

import { Button, Card, Heading, Stack, Text } from '@/components/ui';

/** Helpers for the /design page only. Not part of the app's component library. */

const noopSubscribe = () => () => {};

/**
 * Reads a token's value straight from the CSS (app/tokens.css), so this page never
 * has its own copy of the values.
 */
export function useCssVar(name: string) {
	return useSyncExternalStore(
		noopSubscribe,
		() => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
		() => ''
	);
}

/**
 * The CSS minifier shortens colors (#808080 → gray, #ffffff → #fff). A canvas turns any CSS
 * color back into #rrggbb so the value matches what Figma shows.
 */
function toHex(color: string) {
	const ctx = document.createElement('canvas').getContext('2d');
	if (!ctx) return color;
	ctx.fillStyle = color;
	return ctx.fillStyle.toUpperCase();
}

export function TokenValue({ name }: { name: string }) {
	const raw = useCssVar(name);
	const value = raw && name.startsWith('--color-') ? toHex(raw) : raw;
	return (
		<Text as='span' variant='code' tone='muted'>
			{value || '…'}
		</Text>
	);
}

/** A copyable code example. */
export function CodeBlock({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	}

	return (
		<div className='relative rounded-md border border-line-neutral bg-surface-gray'>
			<pre className='m-0 overflow-x-auto p-4 pr-15'>
				<Text as='code' variant='code'>
					{code}
				</Text>
			</pre>
			<div className='absolute top-2 right-2'>
				<Button variant='minimal' onClick={copy}>
					{copied ? 'Copied' : 'Copy'}
				</Button>
			</div>
		</div>
	);
}

/** One top-level section of the page, with an anchor for the sidebar. */
export function Section({
	id,
	title,
	intro,
	children,
}: {
	id: string;
	title: string;
	intro?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section id={id} className='scroll-mt-6'>
			<Card padding='lg'>
				<Stack gap='6'>
					<Stack gap='2'>
						<Heading variant='h2'>{title}</Heading>
						{intro && <Text tone='muted'>{intro}</Text>}
					</Stack>
					{children}
				</Stack>
			</Card>
		</section>
	);
}

/** A labeled example: live preview on top, code underneath. */
export function Example({
	title,
	code,
	children,
}: {
	title: string;
	code: string;
	children: ReactNode;
}) {
	return (
		<Stack gap='3'>
			<Heading variant='h3'>{title}</Heading>
			<div className='rounded-md border border-line-neutral p-6'>{children}</div>
			<CodeBlock code={code} />
		</Stack>
	);
}

/** Measures the font size an element actually renders at. */
export function useMeasuredFontSize() {
	const [size, setSize] = useState('');
	const ref = (el: HTMLElement | null) => {
		if (el) setSize(getComputedStyle(el).fontSize);
	};
	return [size, ref] as const;
}
