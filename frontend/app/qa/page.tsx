/**
 * @overview example Q&A page showcasing the Post component
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import React from 'react';

import { Post } from '@/components/ui/Post';

export default function QAPage() {
	const samplePosts = [
		{
			title: 'How do I approach the graph algorithms in COS 226?',
			author: 'Sarah Chen',
			date: '2 hours ago',
			courseTag: 'COS 226',
			tags: ['Computer Science', 'algorithms', 'graphs'],
			replies: 12,
			views: 234,
		},
		{
			title: 'Best practices for debugging memory leaks in C?',
			author: 'John Doe',
			date: '5 hours ago',
			courseTag: 'COS 217',
			tags: ['Computer Science', 'C', 'debugging'],
			replies: 8,
			views: 156,
		},
		{
			title: 'Understanding dynamic programming for COS 226 final',
			author: 'Emily Wang',
			date: '1 day ago',
			courseTag: 'COS 226',
			tags: ['Computer Science', 'algorithms', 'dynamic programming'],
			replies: 23,
			views: 412,
		},
	];

	return (
		<div className='min-h-screen bg-background'>
			<div className='max-w-4xl mx-auto py-8 px-4'>
				<h1 className='text-3xl font-bold mb-2 text-foreground'>Q&A Forum</h1>
				<p className='text-muted-foreground mb-8'>
					Ask questions and get help from your peers
				</p>

				<div className='space-y-4'>
					{samplePosts.map((post, index) => (
						<Post
							key={index}
							title={post.title}
							author={post.author}
							date={post.date}
							courseTag={post.courseTag}
							tags={post.tags}
							replies={post.replies}
							views={post.views}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
