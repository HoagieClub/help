/**
 * @overview Hook for filtering posts client side
 */

import { useMemo } from 'react';

import type { PostProps } from '@/components/ui/Post';

export const useSearchPosts = (posts: PostProps[], query: string): PostProps[] => {
	const filtered = useMemo(() => {
		const q = query.toLowerCase().trim();
		if (!q) return posts;

		return posts.filter((post) => {
			const inTitle = post.title.toLowerCase().includes(q);
			const inTages = post.tags.some((tag) => tag.toLowerCase().includes(q));
			const inCourse = post.courseTag?.toLowerCase().includes(q);
			const inAuthor = post.author.toLowerCase().includes(q);
			return inTitle || inTages || inCourse || inAuthor;
		});
	}, [query, posts]);

	return filtered;
};
