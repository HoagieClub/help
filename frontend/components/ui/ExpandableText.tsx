'use client';

import { useState } from 'react';

import { Text } from './Text';

export type ExpandableTextProps = {
	text: string;
	/** Characters shown before "Read more". */
	limit?: number;
};

/**
 * Long text that starts shortened, with a Read more / Read less toggle.
 * Keeps line breaks from the original text.
 *
 * @example
 * <ExpandableText text={answer.text} />
 * <ExpandableText text={comment.text} limit={120} />
 */
export function ExpandableText({ text, limit = 200 }: ExpandableTextProps) {
	const [expanded, setExpanded] = useState(false);
	const needsToggle = text.length > limit;
	const shown = expanded || !needsToggle ? text : `${text.slice(0, limit).trimEnd()}…`;

	return (
		<div className='flex flex-col items-start gap-1'>
			<div className='break-words whitespace-pre-wrap'>
				<Text>{shown}</Text>
			</div>
			{needsToggle && (
				<button
					type='button'
					onClick={() => setExpanded((value) => !value)}
					aria-expanded={expanded}
					className='cursor-pointer rounded-sm font-body text-small text-brand hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'
				>
					{expanded ? 'Read less' : 'Read more'}
				</button>
			)}
		</div>
	);
}
