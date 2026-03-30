'use client';

import React from 'react';

import { Pane } from 'evergreen-ui';

import { CommentBox } from '@/components/comment/CommentBox';
import type { Comment } from '@/types';

type CommentsPanelProps = {
	comments: Comment[];
};

const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments }) => {
	return (
		<Pane className='comments-panel flex flex-col gap-6'>
			{comments.map((comment, idx) => (
				<Pane key={comment.id}>
					<CommentBox comment={comment} showThreadLine={idx < comments.length - 1} />
				</Pane>
			))}
		</Pane>
	);
};

export default CommentsPanel;
