import type { ReactNode } from 'react';

import { Heading } from './Heading';
import { Text } from './Text';

export type EmptyStateProps = {
	title: string;
	description?: string;
	/** Optional next step, usually a Button. */
	action?: ReactNode;
};

/**
 * What to show when a list has nothing in it. Not in Figma yet: plain centered text.
 *
 * @example
 * <EmptyState
 *   title='No study groups yet'
 *   description='Start one for your next exam.'
 *   action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
 * />
 */
export function EmptyState({ title, description, action }: EmptyStateProps) {
	return (
		<div className='flex flex-col items-center gap-2 p-8 text-center'>
			<Heading variant='title'>{title}</Heading>
			{description && (
				<Text variant='body-sm' tone='muted'>
					{description}
				</Text>
			)}
			{action}
		</div>
	);
}
