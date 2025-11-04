/**
 * @overview Post component for Q&A page
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import React from 'react';

export interface PostProps {
	title: string;
	author: string;
	date: string;
	tags: string[];
	replies: number;
	views: number;
	courseTag?: string;
	onClick?: () => void;
}

// Simple SVG icons
const MessageCircleIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="w-4 h-4"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);

const EyeIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="w-4 h-4"
	>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);

export const Post: React.FC<PostProps> = ({
	title,
	author,
	date,
	tags,
	replies,
	views,
	courseTag,
	onClick,
}) => {
	return (
		<div className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow cursor-pointer">
			{/* header with bullet point */}
			<div className="flex items-start gap-3 mb-2">
				<div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0" />
				<div className="flex-1">
					{/* title */}
					<h3
						className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2"
						onClick={onClick}
					>
						{title}
					</h3>

					{/* author and date */}
					<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
						<span className="font-medium">{author}</span>
						<span>•</span>
						<span>{date}</span>
						{courseTag && (
							<>
								<span>•</span>
								<span className="font-medium text-foreground">{courseTag}</span>
							</>
						)}
					</div>

					{/* tags */}
					<div className="flex flex-wrap gap-2 mb-3">
						{tags.map((tag, index) => (
							<span
								key={index}
								className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border hover:bg-accent transition-colors"
							>
								{tag}
							</span>
						))}
					</div>

					{/* footer with replies and views */}
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<MessageCircleIcon />
							<span>{replies} {replies === 1 ? 'reply' : 'replies'}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<EyeIcon />
							<span>{views} {views === 1 ? 'view' : 'views'}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;

