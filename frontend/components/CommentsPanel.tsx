'use client';

import React from 'react';
import { CommentBox } from './CommentBox';
import type { Comment } from '../api/commentService';

type CommentsPanelProps = {
	comments: Comment[];
};

const getThreadedComments = (comments: Comment[]) => {
	const threads: Record<number, Comment[]> = {};
	comments.forEach((comment) => {
		if (!threads[comment.answer]) {
			threads[comment.answer] = [];
		}
		threads[comment.answer].push(comment);
	});
	return Object.values(threads);
};

const Thread: React.FC<{ comments: Comment[] }> = ({ comments }) => {
	return (
		<div className='thread'>
			{comments.map((comment, idx) => (
				<div key={comment.id}>
					<CommentBox comment={comment} showThreadLine={idx < comments.length - 1} />
				</div>
			))}
		</div>
	);
};

const CommentsPanel: React.FC<CommentsPanelProps> = ({ comments }) => {
	const threads = getThreadedComments(comments);

	return (
		<div className='comments-panel flex flex-col gap-6'>
			{threads.map((threadComments, idx) => (
				<Thread comments={threadComments} key={threadComments[0].answer} />
			))}
		</div>
	);
};

export default CommentsPanel;
