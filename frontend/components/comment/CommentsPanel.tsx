'use client';

import React, { useState } from 'react';

import { Button, Pane, useTheme } from 'evergreen-ui';

import { CommentBox } from '@/components/comment/CommentBox';
import { CommentForm } from '@/components/comment/CommentForm';
import type { Comment } from '@/types';

type CommentsPanelProps = {
	comments: Comment[];
	answerId: string;
};

const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments, answerId }) => {
	const theme = useTheme();
	const [showForm, setShowForm] = useState(false);

	return (
		<Pane className='comments-panel flex flex-col gap-6'>
			
			{/* List of existing comments */}
			{comments.map((comment, idx) => (
				<Pane key={comment.id}>
					<CommentBox comment={comment} showThreadLine={idx < comments.length - 1} />
				</Pane>
			))}

			{/* Toggle button to reveal the comment form, hidden while the form is open */}
			{!showForm && (
				<Button
					appearance='primary'
					backgroundColor={theme.colors.red500}
					color='white'
					onClick={() => setShowForm(true)}
				>
					Add Comment
				</Button>
			)}

			{/* Inline comment creation form */}
			{showForm && (
				<CommentForm answerId={answerId} onCommentCreated={() => setShowForm(false)} />
			)}
		</Pane>
	);
};

export default CommentsPanel;
