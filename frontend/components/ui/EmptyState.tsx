import type { ReactNode } from 'react';

import Image from 'next/image';

import { Heading } from './Heading';
import { Text } from './Text';

export type EmptyStateProps = {
	title: string;
	description?: string;
	/** Optional next step, usually a Button. */
	action?: ReactNode;
};

/**
 * What to show when a list has nothing in it. Uses the pointing mascot, per the brand kit.
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
		<div className='flex flex-col items-center gap-3 p-8 text-center'>
			<Image src='/brand/hoagie-point.svg' alt='' width={70} height={80} unoptimized />
			<Heading variant='h3' tone='ink'>
				{title}
			</Heading>
			{description && <Text tone='muted'>{description}</Text>}
			{action}
		</div>
	);
}
