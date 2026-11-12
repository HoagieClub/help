import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

export type StatProps = {
	icon: LucideIcon;
	/** Fill the icon, e.g. the solid upvote triangle. */
	filled?: boolean;
	/** The number, with or without a word: "12" or "45 views". */
	children: ReactNode;
};

/**
 * An icon with a count, read-only. For a count people can click, use UpvoteButton.
 *
 * @example
 * <Stat icon={Triangle} filled>12</Stat>
 * <Stat icon={Eye}>45 views</Stat>
 */
export function Stat({ icon: Icon, filled = false, children }: StatProps) {
	return (
		<span className='inline-flex items-center gap-1 font-body text-label text-muted'>
			<Icon aria-hidden='true' className={filled ? 'h-3 w-3 fill-current' : 'h-4 w-4'} />
			{children}
		</span>
	);
}
