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
 *   description='Collaborate with peers on coursework and exam preparation'
 *   action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
 * />
 */
export function PageHeader({ title, description, action }: PageHeaderProps) {
	return (
		<div className='flex flex-wrap items-start justify-between gap-4'>
			<div className='flex flex-col gap-2'>
				<Heading variant='h1'>{title}</Heading>
				{description && <Text tone='muted'>{description}</Text>}
			</div>
			{action}
		</div>
	);
}
