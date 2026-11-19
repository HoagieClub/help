import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from './Button';

export type BackLinkProps = {
	href: string;
	/** Defaults to "Back". */
	children?: string;
};

/**
 * "← Back" above a page title.
 *
 * @example
 * <BackLink href='/questions' />
 */
export function BackLink({ href, children = 'Back' }: BackLinkProps) {
	return (
		<div>
			<Button variant='ghost' size='sm' asChild>
				<Link href={href}>
					<ArrowLeft aria-hidden='true' className='h-4 w-4' />
					{children}
				</Link>
			</Button>
		</div>
	);
}
