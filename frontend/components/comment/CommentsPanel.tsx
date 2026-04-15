'use client';

import React from 'react';

import { Pane } from 'evergreen-ui';

import { CommentBox } from '@/components/comment/CommentBox';
import { CommentForm } from '@/components/comment/CommentForm';
import type { Comment } from '@/types';

type CommentsPanelProps = {
	comments: Comment[];
	answerId: string;
};

const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments, answerId }) => {
	return (
		<Pane className='comments-panel flex flex-col gap-6'>
			{/* List of existing comments */}
			{comments.map((comment, idx) => (
				<Pane key={comment.id}>
					<CommentBox comment={comment} showThreadLine={idx < comments.length - 1} />
				</Pane>
			))}

			{/* Comment form */}
			<CommentForm answerId={answerId} />
		</Pane>
	);
};

export default CommentsPanel;
