'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';

import { Button, Heading, Stack, Text } from '@/components/ui';

/** Helpers for the /design pages only. Not part of the app's component library. */

const noopSubscribe = () => () => {};

/** Reads a token's value from app/tokens.css, so these pages never keep their own copy. */
function useCssVar(name: string) {
	return useSyncExternalStore(
		noopSubscribe,
		() => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
		() => ''
	);
}

/** The CSS minifier shortens colors (#808080 → gray); a canvas turns them back into #RRGGBB. */
function toHex(color: string) {
	const ctx = document.createElement('canvas').getContext('2d');
	if (!ctx) {
		return color;
	}
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

export function PageHeader({ title, summary }: { title: string; summary?: string }) {
	return (
		<Stack gap='2'>
			<Heading variant='h1'>{title}</Heading>
			{summary && <Text tone='muted'>{summary}</Text>}
		</Stack>
	);
}

/** Bordered box that holds live examples. */
export function Preview({ children }: { children: ReactNode }) {
	return <div className='rounded-md border border-line-neutral p-6'>{children}</div>;
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

export function Wordmark({ size = 'h1' }: { size?: 'h1' | 'display' }) {
	return (
		<span className={size === 'display' ? 'font-heading text-display' : 'font-heading text-h1'}>
			<span className='text-ink'>hoagie</span>
			<span className='text-brand'>help</span>
		</span>
	);
}
