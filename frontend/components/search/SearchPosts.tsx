/**
 * @overview componenet for searching and displaying posts.
 * USes SearchBar useSearchPosts hook and Post Component.
 */

import React, { useState } from 'react';

import { Post, type PostProps } from '@/components/ui/Post';

import { useDebounce } from './hooks/useDebounce';
import { useSearchPosts } from './hooks/useSearchPosts';
import { SearchBar } from './SearchBar';

interface SearchPostsProps {
	posts: PostProps[];
}

export const SearchPosts: React.FC<SearchPostsProps> = ({ posts }) => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 200);

	const filteredPosts = useSearchPosts(posts, debouncedQuery);

	return (
		<div className='flex flex-col gap-4 w-full'>
			<SearchBar
				value={query}
				onChange={setQuery}
				placeholder='Search posts by title, tag, or course...'
			/>
			<div className='flex flex-col gap-4'>
				{filteredPosts.length > 0 ? (
					filteredPosts.map((post, idx) => <Post key={idx} {...post} />)
				) : (
					<p className='text-muted-foreground text-center mt-4'>
						No results for &quot;{debouncedQuery}&quot;.
					</p>
				)}
			</div>
		</div>
	);
};
