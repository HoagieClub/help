'use client';

import { useState } from 'react';

import { Button, Checkbox, Message, Stack, Textarea } from '@/components/ui';
import { useCreateComment } from '@/hooks/mutations';

export type CommentFormProps = {
	answerId: string;
	/** Called after posting or cancelling, so the parent can close the box. */
	onDone: () => void;
	/** Called after a comment is posted, so the page can reload its comments. */
	onPosted?: () => void;
};

/**
 * The reply box under an answer: text, "Post anonymously", Cancel and Submit.
 *
 * @example
 * {isReplying && <CommentForm answerId={answer.id} onDone={() => setIsReplying(false)} />}
 */
export function CommentForm({ answerId, onDone, onPosted }: CommentFormProps) {
	const [text, setText] = useState('');
	const [anonymous, setAnonymous] = useState(false);
	const createComment = useCreateComment();

	async function submit() {
		if (!text.trim()) {
			return;
		}
		const created = await createComment.run(answerId, {
			text: text.trim(),
			is_anonymous: anonymous,
		});
		if (created) {
			onDone();
			onPosted?.();
		}
	}

	return (
		<Stack gap='3'>
			<Textarea
				label='Write a reply'
				hideLabel
				rows={3}
				placeholder='Write your reply here…'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			{createComment.error && <Message variant='error'>{createComment.error}</Message>}
			<Stack direction='row' justify='between' align='center' wrap>
				<Checkbox
					label='Post anonymously'
					checked={anonymous}
					onChange={(e) => setAnonymous(e.target.checked)}
				/>
				<Stack direction='row' gap='2'>
					<Button variant='secondary' onClick={onDone}>
						Cancel
					</Button>
					<Button onClick={submit} disabled={!text.trim() || createComment.pending}>
						{createComment.pending ? 'Posting…' : 'Submit'}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}
