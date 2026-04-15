'use client';

import React, { useState } from 'react';

import { Button, Checkbox, Pane, Textarea, useTheme } from 'evergreen-ui';

import { createNewComment } from '@/api/commentService';

interface CommentFormProps {
	answerId: string;
}

/**
 * Renders an "Add Comment" button that expands into a form
 * with a textarea, anonymous toggle, and submit/cancel actions.
 */
export function CommentForm({ answerId }: CommentFormProps) {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);
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
			setIsOpen(false);
			// TODO: refresh comment list in AnswerBox after successful submission
		}
		// TODO: handle error for failed submissions
	};

	const handleCancel = () => {
		setText('');
		setIsAnonymous(false);
		setIsOpen(false);
	};

	// If the form is not open, show the "Add Comment" button
	if (!isOpen) {
		return (
			<Button
				appearance='primary'
				backgroundColor={theme.colors.red500}
				color='white'
				onClick={() => setIsOpen(true)}
			>
				Add Comment
			</Button>
		);
	}

	// If the form is open, show the comment form
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
					Submit
				</Button>
				<Button appearance='minimal' color={theme.colors.gray700} onClick={handleCancel}>
					Cancel
				</Button>
			</Pane>
		</Pane>
	);
}

export default CommentForm;
