'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { Input, Stack, Tag } from '@/components/ui';

const CATEGORIES = [
	'All Groups',
	'Science',
	'Mathematics',
	'Humanities',
	'Engineering',
	'Social Sciences',
];

export type StudyGroupFiltersProps = {
	onSearchChange?: (query: string) => void;
	onDateChange?: (date: string) => void;
	onCategoryChange?: (category: string) => void;
};

/**
 * Search box, date filter and category chips above the study group list.
 *
 * @example
 * <StudyGroupFilters onSearchChange={setQuery} onCategoryChange={setCategory} />
 */
export function StudyGroupFilters({
	onSearchChange,
	onDateChange,
	onCategoryChange,
}: StudyGroupFiltersProps) {
	const [query, setQuery] = useState('');
	const [date, setDate] = useState('');
	const [category, setCategory] = useState(CATEGORIES[0]);

	return (
		<Stack gap='4'>
			<Stack direction='row' gap='4' wrap>
				<div className='min-w-0 flex-1'>
					<Input
						label='Search study groups'
						hideLabel
						type='search'
						icon={Search}
						placeholder='Search study groups…'
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							onSearchChange?.(e.target.value);
						}}
					/>
				</div>
				<div>
					<Input
						label='Date'
						hideLabel
						type='date'
						value={date}
						onChange={(e) => {
							setDate(e.target.value);
							onDateChange?.(e.target.value);
						}}
					/>
				</div>
			</Stack>

			<Stack direction='row' gap='2' wrap>
				{CATEGORIES.map((name) => (
					<Tag key={name} asChild variant={category === name ? 'selected' : 'idle'}>
						<button
							type='button'
							aria-pressed={category === name}
							onClick={() => {
								setCategory(name);
								onCategoryChange?.(name);
							}}
						>
							{name}
						</button>
					</Tag>
				))}
			</Stack>
		</Stack>
	);
}
