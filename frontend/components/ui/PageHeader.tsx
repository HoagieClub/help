import type { ReactNode } from 'react';

import { Heading } from './Heading';
import { Text } from './Text';

export type PageHeaderProps = {
	title: string;
	description?: string;
	/** Optional main action on the right, usually a Button. */
	action?: ReactNode;
};

/**
 * The title block at the top of a page. Renders the page's one h1.
 *
 * @example
 * <PageHeader
 *   title='Study Groups'
 *   description='Find classmates and form study groups'
 *   action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
 * />
 */
export function PageHeader({ title, description, action }: PageHeaderProps) {
	return (
		<div className='flex flex-wrap items-start justify-between gap-4'>
			<div className='flex flex-col gap-1'>
				<Heading variant='h1'>{title}</Heading>
				{description && <Text tone='muted'>{description}</Text>}
			</div>
			{action}
		</div>
	);
}
