import type { ReactNode } from 'react';

import { Card } from '@/components/ui';

import { DesignSidebar } from './DesignSidebar';

/** Shared shell for every /design page: sidebar on the left, one white card of content on the right. */
export default function DesignLayout({ children }: { children: ReactNode }) {
	return (
		<div className='mx-auto max-w-6xl px-4 py-10'>
			<div className='md:grid md:grid-cols-4 md:gap-8'>
				<div className='mb-8 md:mb-0'>
					<div className='md:sticky md:top-6'>
						<DesignSidebar />
					</div>
				</div>
				<main className='md:col-span-3'>
					<Card padding='lg'>{children}</Card>
				</main>
			</div>
		</div>
	);
}
