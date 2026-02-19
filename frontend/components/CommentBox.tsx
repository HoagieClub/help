/**
 * @overview CommentBox component for displaying comments
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import { useState } from 'react';

import { FaHeart, FaEllipsisH } from 'react-icons/fa';

import { FaUser } from 'react-icons/fa6';

import type { Comment } from '../api/commentService';

export interface CommentBoxProps {
	comment: Comment;
	username?: string;
	isLikedByCurrentUser?: boolean;
	onHeartClick?: () => void;
	onMoreClick?: () => void;
	showThreadLine?: boolean;
	maxLength?: number;
}

function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInMs = now.getTime() - date.getTime();
	const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

	if (diffInMonths < 1) {
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
		if (diffInDays < 1) {
			const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
			if (diffInHours < 1) {
				const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
				return diffInMinutes < 1 ? 'now' : `${diffInMinutes}m`;
			}
			return `${diffInHours}h`;
		}
		return `${diffInDays}d`;
	}

	if (diffInMonths < 12) {
		return `${diffInMonths}mth`;
	}

	const diffInYears = Math.floor(diffInMonths / 12);
	return `${diffInYears}yr`;
}

const DEFAULT_MAX_LENGTH = 200;

export function CommentBox({
	comment,
	username,
	isLikedByCurrentUser = false,
	onHeartClick,
	onMoreClick,
	showThreadLine = false,
	maxLength = DEFAULT_MAX_LENGTH,
}: CommentBoxProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const displayName = comment.is_anonymous ? 'Anonymous' : username || 'Unknown User';
	const isAnonymous = comment.is_anonymous;
	const shouldTruncate = comment.text.length > maxLength;
	const displayText =
		isExpanded || !shouldTruncate ? comment.text : comment.text.slice(0, maxLength) + '...';

	return (
		<div className='flex items-start gap-3 pb-4'>
			{/* Avatar and thread line */}
			<div className='flex flex-col items-center flex-shrink-0'>
				{/* Avatar */}
				<div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center'>
					<FaUser className='w-4 h-4 text-gray-600' />
				</div>
				{/* Vertical thread line */}
				{showThreadLine && (
					<div className='w-0.5 h-full bg-gray-200 mt-2 flex-1 min-h-[20px]' />
				)}
			</div>

			{/* Comment content */}
			<div className='flex-1 min-w-0'>
				{/* Username and timestamp */}
				<div className='flex items-center gap-2 mb-1'>
					<span
						className={`text-sm font-medium ${
							isAnonymous ? 'text-orange-600' : 'text-gray-900'
						}`}
					>
						{displayName}
					</span>
					<span className='text-sm text-gray-500'>{formatDate(comment.created_at)}</span>
				</div>

				{/* Comment text */}
				<div className='text-gray-900 text-sm mb-3 whitespace-pre-wrap break-words'>
					{displayText}
				</div>

				{/* Read more/less button */}
				{shouldTruncate && (
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className='text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors cursor-pointer'
					>
						{isExpanded ? 'Read less' : 'Read more'}
					</button>
				)}

				{/* Interaction buttons */}
				<div className='flex items-center gap-4'>
					<button
						onClick={onHeartClick}
						className={`flex items-center gap-1 transition-colors ${
							onHeartClick ? 'cursor-pointer hover:opacity-70' : 'cursor-default'
						}`}
						disabled={!onHeartClick}
					>
						<FaHeart
							className={`${
								isLikedByCurrentUser
									? 'text-red-500 fill-red-500'
									: 'text-gray-400 fill-none'
							}`}
							size={14}
						/>
					</button>
					{onMoreClick && (
						<button
							onClick={onMoreClick}
							className='text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
						>
							<FaEllipsisH size={14} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default CommentBox;
