'use client';

import { useState } from 'react';

import { Button, Card, Checkbox, Message, Stack, Textarea } from '@/components/ui';
import { useCreateComment } from '@/hooks/mutations';

export type CommentFormProps = {
	answerId: string;
	/** Called after a comment is posted, so the page can reload its comments. */
	onPosted?: () => void;
};

/**
 * "Add a comment" button that opens a small form under an answer.
 *
 * @example
 * <CommentForm answerId={String(answer.id)} />
 */
export function CommentForm({ answerId, onPosted }: CommentFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [text, setText] = useState('');
	const [anonymous, setAnonymous] = useState(false);
	const createComment = useCreateComment();

	function close() {
		setText('');
		setAnonymous(false);
		createComment.clearError();
		setIsOpen(false);
	}

	async function submit() {
		if (!text.trim()) {
			return;
		}
		const created = await createComment.run(answerId, {
			text: text.trim(),
			is_anonymous: anonymous,
		});
		if (created) {
			close();
			onPosted?.();
		}
	}

	if (!isOpen) {
		return (
			<div>
				<Button variant='minimal' onClick={() => setIsOpen(true)}>
					Add a comment
				</Button>
			</div>
		);
	}

	return (
		<Card padding='sm'>
			<Stack gap='3'>
				<Textarea
					label='Write a comment'
					hideLabel
					rows={3}
					placeholder='Write a comment…'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<Checkbox
					label='Post anonymously'
					checked={anonymous}
					onChange={(e) => setAnonymous(e.target.checked)}
				/>
				{createComment.error && <Message variant='error'>{createComment.error}</Message>}
				<Stack direction='row' gap='2'>
					<Button onClick={submit} disabled={!text.trim() || createComment.pending}>
						{createComment.pending ? 'Posting…' : 'Post comment'}
					</Button>
					<Button variant='secondary' onClick={close}>
						Cancel
					</Button>
				</Stack>
			</Stack>
		</Card>
	);
}
