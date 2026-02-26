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

import {
	Avatar,
	Button,
	HeartIcon,
	IconButton,
	majorScale,
	MoreIcon,
	Pane,
	Text,
	useTheme,
} from 'evergreen-ui';

import type { Comment } from '@/types';

const MAX_LENGTH_BEFORE_TRUNCATE = 200;

export interface CommentBoxProps {
	comment: Comment;
	username?: string; // TODO: Pass username into CommentBox and make it required
	showThreadLine: boolean;
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

export function CommentBox({ comment, username, showThreadLine }: CommentBoxProps) {
	const theme = useTheme();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	const handleHeartClick = () => {
		setIsLiked((prev) => !prev);
		alert('Heart clicked');
	};
	const handleMoreClick = () => alert('More options clicked');
	const displayName = comment.isAnonymous ? 'Anonymous' : username || 'Unknown User';
	const isAnonymous = comment.isAnonymous;
	const shouldTruncate = comment.text.length > MAX_LENGTH_BEFORE_TRUNCATE;
	const displayText =
		isExpanded || !shouldTruncate
			? comment.text
			: comment.text.slice(0, MAX_LENGTH_BEFORE_TRUNCATE) + '...';

	return (
		<Pane
			display='flex'
			alignItems='flex-start'
			gap={majorScale(2)}
			paddingBottom={majorScale(2)}
		>
			{/* Avatar and thread line */}
			<Pane display='flex' flexDirection='column' alignItems='center' flexShrink={0}>
				<Avatar
					name={displayName}
					size={32}
					backgroundColor={isAnonymous ? theme.colors.orange100 : theme.colors.gray300}
				/>
				{showThreadLine && (
					<Pane
						width={2}
						flex={1}
						minHeight={20}
						marginTop={majorScale(1)}
						backgroundColor={theme.colors.gray200}
					/>
				)}
			</Pane>

			{/* Comment content */}
			<Pane flex={1} minWidth={0}>
				{/* Username and timestamp */}
				<Pane display='flex' alignItems='center' gap={majorScale(1)} marginBottom={4}>
					<Text
						size={300}
						fontWeight={500}
						color={isAnonymous ? theme.colors.orange700 : theme.colors.gray900}
					>
						{displayName}
					</Text>
					<Text size={300} color='muted'>
						{formatDate(comment.createdAt)}
					</Text>
				</Pane>

				{/* Comment text */}
				<Text
					size={300}
					color={theme.colors.gray900}
					marginBottom={majorScale(1)}
					whiteSpace='pre-wrap'
					wordBreak='break-word'
				>
					{displayText}
				</Text>

				{/* Read more/less button */}
				{shouldTruncate && (
					<Button
						appearance='minimal'
						height={24}
						paddingX={0}
						marginBottom={majorScale(1)}
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{isExpanded ? 'Read less' : 'Read more'}
					</Button>
				)}

				{/* Interaction buttons */}
				<Pane display='flex' alignItems='center' gap={majorScale(2)}>
					<IconButton
						icon={HeartIcon}
						appearance='minimal'
						height={24}
						iconSize={14}
						color={isLiked ? 'red500' : 'gray400'}
						onClick={handleHeartClick}
					/>
					<IconButton
						icon={MoreIcon}
						appearance='minimal'
						height={24}
						iconSize={14}
						color='gray400'
						onClick={handleMoreClick}
					/>
				</Pane>
			</Pane>
		</Pane>
	);
}

export default CommentBox;
