/**
 * @overview componenet for searching and displaying posts.
 * USes SearchBar useSearchPosts hook and Post Component.
 */

import React, { useState, useEffect } from 'react';
import { Post, PostProps } from 'frontend/components/ui/Post';
import { SearchBar } from './SearchBar';
import { useSearchPosts } from './hooks/useSearchPosts';

export interface SearchPostsProps {
	post: PostProps[];
}

export const SearchPosts: React.FC<SearchPostsProps> = ({ posts }) => {
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedQuery(query), 200);
		return () => clearTimeout(handler);
	}, [query]);

	const filteredPosts = useSearchPosts(posts, debouncedQuery);

	return (
		<div className='flex-col gap-4 w-full'>
			<SearchBar
				value={query}
				onChange={setQuery}
				placeholder='Search posts by title, tag, or course...'
			/>
			<div className='flex gap-4'>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post, idx) => <Post key={idx} {...post} />)
				) : (
					<p className='text-muted-foreground text-center mt-4'>
						No results for "{debouncedQuery}".
					</p>
				)}
			</div>
		</div>
	);
};
