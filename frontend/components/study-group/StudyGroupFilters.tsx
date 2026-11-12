'use client';

import { useState } from 'react';

import { Search } from 'lucide-react';

import { FilterGroup, Input, Stack } from '@/components/ui';

const CATEGORIES = [
	{ value: 'all', label: 'All Groups' },
	{ value: 'science', label: 'Science' },
	{ value: 'mathematics', label: 'Mathematics' },
	{ value: 'humanities', label: 'Humanities' },
	{ value: 'engineering', label: 'Engineering' },
	{ value: 'social-sciences', label: 'Social Sciences' },
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
	const [category, setCategory] = useState(CATEGORIES[0].value);

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
