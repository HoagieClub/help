'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { FilterGroup, Input, Select, Stack } from '@/components/ui';

const CATEGORIES = [
	{ value: 'all', label: 'All Groups' },
	{ value: 'science', label: 'Science' },
	{ value: 'mathematics', label: 'Mathematics' },
	{ value: 'humanities', label: 'Humanities' },
	{ value: 'engineering', label: 'Engineering' },
	{ value: 'social-sciences', label: 'Social Sciences' },
];

const SORT_OPTIONS = [
	{ value: 'date', label: 'Date' },
	{ value: 'spots', label: 'Open spots' },
];

export type StudyGroupFiltersProps = {
	onSearchChange?: (query: string) => void;
	onSortChange?: (sort: string) => void;
	onCategoryChange?: (category: string) => void;
};

/**
 * Search, sort and category filters above the study group grid.
 * Not wired to the API yet: the parent gets the values through the callbacks.
 *
 * @example
 * <StudyGroupFilters onSearchChange={setQuery} onCategoryChange={setCategory} />
 */
export function StudyGroupFilters({
	onSearchChange,
	onSortChange,
	onCategoryChange,
}: StudyGroupFiltersProps) {
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState(SORT_OPTIONS[0].value);
	const [category, setCategory] = useState(CATEGORIES[0].value);

	return (
		<Stack gap='4'>
			<Stack direction='row' gap='3' wrap>
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
					<Select
						label='Sort by'
						hideLabel
						options={SORT_OPTIONS}
						value={sort}
						onChange={(e) => {
							setSort(e.target.value);
							onSortChange?.(e.target.value);
						}}
					/>
				</div>
			</Stack>

			<FilterGroup
				label='Filter by category'
				options={CATEGORIES}
				value={category}
				onChange={(value) => {
					setCategory(value);
					onCategoryChange?.(value);
				}}
			/>
		</Stack>
	);
}
