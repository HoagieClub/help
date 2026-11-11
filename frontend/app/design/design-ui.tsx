'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';

import { ExternalLink } from 'lucide-react';

import { Button, Heading, Stack, Text } from '@/components/ui';

import { BRAND_KIT_URL, figmaUrl } from './nav';

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

/** "Open in Figma" for a Brand Kit frame (or the whole file when there's no frame). */
export function FigmaLink({
	nodeId,
	label = 'Open in Figma',
}: {
	nodeId?: string;
	label?: string;
}) {
	return (
		<a
			href={nodeId ? figmaUrl(nodeId) : BRAND_KIT_URL}
			target='_blank'
			rel='noreferrer'
			className='inline-flex items-center gap-1 font-body text-label text-brand hover:text-brand-hover'
		>
			{label}
			<ExternalLink aria-hidden='true' className='h-4 w-4' />
		</a>
	);
}

export function PageHeader({
	title,
	summary,
	figma,
}: {
	title: string;
	summary?: string;
	/** Brand Kit node-id; shows "Open in Figma" on the right. */
	figma?: string;
}) {
	return (
		<Stack gap='2'>
			<Stack direction='row' justify='between' align='center' gap='4' wrap>
				<Heading variant='h1'>{title}</Heading>
				{figma && <FigmaLink nodeId={figma} />}
			</Stack>
			{summary && <Text tone='muted'>{summary}</Text>}
		</Stack>
	);
}

/** Bordered box that holds live examples. */
export function Preview({ children }: { children: ReactNode }) {
	return <div className='rounded-md border border-line bg-surface-gray p-6'>{children}</div>;
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
		<div className='relative rounded-md border border-line bg-surface-gray'>
			<pre className='m-0 overflow-x-auto p-4 pr-15'>
				<Text as='code' variant='code'>
					{code}
				</Text>
			</pre>
			<div className='absolute top-2 right-2'>
				<Button variant='ghost' size='sm' onClick={copy}>
					{copied ? 'Copied' : 'Copy'}
				</Button>
			</div>
		</div>
	);
}

/** "hoagiehelp" in Inter bold, with "help" in brand red, as in the Figma nav bar. */
export function Wordmark({ size = 'h3' }: { size?: 'h3' | 'h1' }) {
	return (
		<span className={size === 'h1' ? 'font-body text-h1' : 'font-body text-h3'}>
			<span className='text-ink'>hoagie</span>
			<span className='text-brand'>help</span>
		</span>
	);
}
