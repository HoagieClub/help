'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Input, Stack, Text } from '@/components/ui';
import { cn } from '@/lib/utils';

import { DESIGN_NAV, START_HERE, type NavItem } from './nav';

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
	return (
		<Link
			href={item.href}
			aria-current={active ? 'page' : undefined}
			className={cn(
				'block rounded-md px-2 py-1 font-body text-body-sm transition-colors',
				active ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-line'
			)}
		>
			{item.label}
		</Link>
	);
}

export function DesignSidebar() {
	const pathname = usePathname();
	const [query, setQuery] = useState('');
	const q = query.trim().toLowerCase();

	const groups = DESIGN_NAV.map((group) => ({
		...group,
		items: q
			? group.items.filter(
					(item) =>
						item.label.toLowerCase().includes(q) ||
						(item.summary ?? '').toLowerCase().includes(q)
				)
			: group.items,
	})).filter((group) => group.items.length > 0);

	return (
		<nav aria-label='Design system'>
			<Stack gap='4'>
				<Input
					label='Find a component'
					hideLabel
					type='search'
					variant='search'
					icon={Search}
					placeholder='Find a component…'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>

				{!q && <NavLink item={START_HERE} active={pathname === START_HERE.href} />}

				{groups.map((group) => (
					<Stack key={group.title} gap='1'>
						<div className='px-2'>
							<Text variant='small' tone='muted'>
								{group.title}
							</Text>
						</div>
						<Stack as='ul' gap='0'>
							{group.items.map((item) => (
								<li key={item.href}>
									<NavLink item={item} active={pathname === item.href} />
								</li>
							))}
						</Stack>
					</Stack>
				))}

				{groups.length === 0 && (
					<div className='px-2'>
						<Text variant='body-sm' tone='muted'>
							Nothing matches “{query}”.
						</Text>
					</div>
				)}
			</Stack>
		</nav>
	);
}
