'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Stack, Text } from '@/components/ui';

import { DESIGN_NAV } from './nav';

export function DesignSidebar() {
	const pathname = usePathname();

	return (
		<nav aria-label='Design system'>
			<Stack gap='6'>
				{DESIGN_NAV.map((group) => (
					<Stack key={group.title} gap='2'>
						<Text variant='small' tone='muted'>
							{group.title.toUpperCase()}
						</Text>
						<Stack as='ul' gap='1'>
							{group.items.map((item) => {
								const active = pathname === item.href;
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											aria-current={active ? 'page' : undefined}
										>
											<Text
												as='span'
												variant='label'
												tone={active ? 'brand' : 'default'}
											>
												{item.label}
											</Text>
										</Link>
									</li>
								);
							})}
						</Stack>
					</Stack>
				))}
			</Stack>
		</nav>
	);
}

export default DesignSidebar;
