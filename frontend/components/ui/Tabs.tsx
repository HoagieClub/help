'use client';

import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/utils';

export type TabItem<T extends string> = { value: T; label: string };

export type TabsProps<T extends string> = {
	items: TabItem<T>[];
	value: T;
	onChange: (value: T) => void;
	/** Names the group for screen readers, e.g. "Posts". */
	label: string;
};

/**
 * A row of tabs that switches what's shown below it. Arrow keys move between tabs.
 *
 * @example
 * const [tab, setTab] = useState<'questions' | 'answers'>('questions');
 *
 * <Tabs
 *   label='Posts'
 *   items={[{ value: 'questions', label: 'Questions' }, { value: 'answers', label: 'Answers' }]}
 *   value={tab}
 *   onChange={setTab}
 * />
 */
export function Tabs<T extends string>({ items, value, onChange, label }: TabsProps<T>) {
	function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
			return;
		}
		const index = items.findIndex((item) => item.value === value);
		const step = event.key === 'ArrowRight' ? 1 : -1;
		const next = items[(index + step + items.length) % items.length];
		onChange(next.value);
	}

	return (
		<div
			role='tablist'
			aria-label={label}
			onKeyDown={onKeyDown}
			className='flex gap-4 border-b border-line'
		>
			{items.map((item) => {
				const selected = item.value === value;
				return (
					<button
						key={item.value}
						type='button'
						role='tab'
						aria-selected={selected}
						tabIndex={selected ? 0 : -1}
						onClick={() => onChange(item.value)}
						className={cn(
							'-mb-px cursor-pointer border-b-2 pb-2 font-body text-body-sm transition-colors',
							'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
							selected
								? 'border-brand text-brand'
								: 'border-transparent text-muted hover:text-ink'
						)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
}
