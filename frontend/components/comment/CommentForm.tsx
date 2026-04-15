'use client';

import React, { useState } from 'react';

import { Button, Checkbox, Pane, Textarea, useTheme } from 'evergreen-ui';

import { createNewComment } from '@/api/commentService';

interface CommentFormProps {
	answerId: string;
	onCommentCreated?: () => void;
}

/**
 * A form that lets users write and submit a comment for a given answer.
 * Includes a textarea for the comment body, an anonymous toggle, and
 * submit / cancel actions.
 */
export function CommentForm({ answerId, onCommentCreated }: CommentFormProps) {
	const theme = useTheme();
	const [text, setText] = useState('');
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!text.trim() || isSubmitting) return;

		setIsSubmitting(true);
		const result = await createNewComment(answerId, {
			text: text.trim(),
			is_anonymous: isAnonymous,
		});
		setIsSubmitting(false);

		if (result) {
			setText('');
			setIsAnonymous(false);
			onCommentCreated?.();
		}
	};

	const handleCancel = () => {
		setText('');
		setIsAnonymous(false);
		onCommentCreated?.();
	};

	return (
		<Pane
			display='flex'
			flexDirection='column'
			gap={12}
			padding={16}
			border
			borderRadius={8}
			borderColor={theme.colors.gray400}
			backgroundColor={theme.colors.gray50}
		>
			{/* Comment text input */}
			<Textarea
				placeholder='Write a comment...'
				value={text}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
				rows={3}
			/>

			{/* Anonymous posting toggle */}
			<Checkbox
				label='Post anonymously'
				checked={isAnonymous}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setIsAnonymous(e.target.checked)
				}
				margin={0}
			/>

			{/* Form action buttons */}
			<Pane display='flex' alignItems='center' gap={8}>
				<Button
					appearance='primary'
					backgroundColor={theme.colors.red500}
					color='white'
					onClick={handleSubmit}
					isLoading={isSubmitting}
					disabled={!text.trim()}
				>
					Add Comment
				</Button>
				<Button appearance='minimal' color={theme.colors.gray700} onClick={handleCancel}>
					Cancel
				</Button>
			</Pane>
		</Pane>
	);
}

export default CommentForm;
