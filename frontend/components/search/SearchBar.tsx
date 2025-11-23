/**
 *  @overview Search input component
 */

import React from 'react';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	placeholder = 'Search...',
}) => (
	<input
		type='text'
		aria-label='Search posts'
		placeholder={placeholder}
		value={value}
		onChange={(e) => onChange(e.target.value)}
		className='w-full px-4 py-2 border rounded-lg bg-background text-foreground
               focus:outline-none focus:ring-2 focus:ring-primary transition-all'
	/>
);

export default SearchBar;
