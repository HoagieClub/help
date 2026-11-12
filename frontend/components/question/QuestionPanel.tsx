'use client';

import { useState } from 'react';

import { Triangle } from 'lucide-react';
import { toast } from 'sonner';

import {
	Button,
	Byline,
	Checkbox,
	Heading,
	Message,
	Stack,
	Stat,
	Tag,
	Text,
	Textarea,
	UpvoteButton,
} from '@/components/ui';
import { useCreateAnswer } from '@/hooks/mutations';
import { useUpvote } from '@/hooks/useUpvote';
import { formatTimePassed } from '@/lib/format';

export type QuestionPanelProps = {
	questionId: string;
	author: string;
	anonymous: boolean;
	title: string;
	course: string | null;
	tags: string[];
	details: string;
	createdAt: string;
	/** The current upvote count (`hearts` in the API). */
	upvotes: number;
	/** Called after an answer is posted, so the page can reload its answers. */
	onAnswerPosted?: () => void;
};

/**
 * The top of a question page: title, asker, tags, body, Upvote and Reply, and the answer box.
 *
 * @example
 * <QuestionPanel
 *   questionId='1'
 *   author='Alex Chen'
 *   anonymous={false}
 *   title='Best strategies for COS226 midterm prep?'
 *   course='COS 226'
 *   tags={['exam prep']}
 *   details='I have my midterm coming up…'
 *   createdAt={question.create_time}
 *   upvotes={12}
 * />
 */
export function QuestionPanel({
	questionId,
	author,
	anonymous,
	title,
	course,
	tags,
	details,
	createdAt,
	upvotes,
	onAnswerPosted,
}: QuestionPanelProps) {
	const upvote = useUpvote({ kind: 'question', id: questionId, initialCount: upvotes });
	const createAnswer = useCreateAnswer();
	const [isAnswering, setIsAnswering] = useState(false);
	const [answer, setAnswer] = useState('');
	const [answerAnonymous, setAnswerAnonymous] = useState(false);

	function closeAnswerBox() {
		setAnswer('');
		setAnswerAnonymous(false);
		createAnswer.clearError();
		setIsAnswering(false);
	}

	async function submitAnswer() {
		if (!answer.trim()) {
			return;
		}
		const created = await createAnswer.run(questionId, {
			text: answer.trim(),
			is_anonymous: answerAnonymous,
		});
		if (created) {
			toast.success('Answer posted.');
			closeAnswerBox();
			onAnswerPosted?.();
		}
	}

	return (
		<Stack gap='4'>
			<Heading variant='h2' as='h1'>
				{title}
			</Heading>

			<Byline
				name={author}
				anonymous={anonymous}
				meta={['Q&A', formatTimePassed(createdAt)]}
			/>

			<Stack direction='row' gap='3' align='center' wrap>
				{course && <Tag variant='course'>{course}</Tag>}
				{tags.map((tag) => (
					<Tag key={tag}>{tag}</Tag>
				))}
				<Stat icon={Triangle} filled>
					{upvote.count} {upvote.count === 1 ? 'Upvote' : 'Upvotes'}
				</Stat>
			</Stack>

			<Stack gap='2'>
				<div className='break-words whitespace-pre-wrap'>
					<Text>{details}</Text>
				</div>
				<Stack direction='row' gap='4' align='center'>
					<UpvoteButton {...upvote} thing='question' />
					{!isAnswering && (
						<Button variant='link' size='inline' onClick={() => setIsAnswering(true)}>
							Reply
						</Button>
					)}
				</Stack>
			</Stack>

			{isAnswering && (
				<Stack gap='3'>
					<Textarea
						label='Your answer'
						hideLabel
						rows={4}
						placeholder='Write your answer here…'
						value={answer}
						onChange={(e) => setAnswer(e.target.value)}
					/>
					{createAnswer.error && <Message variant='error'>{createAnswer.error}</Message>}
					<Stack direction='row' justify='between' align='center' wrap>
						<Checkbox
							label='Post anonymously'
							checked={answerAnonymous}
							onChange={(e) => setAnswerAnonymous(e.target.checked)}
						/>
						<Stack direction='row' gap='2'>
							<Button variant='secondary' onClick={closeAnswerBox}>
								Cancel
							</Button>
							<Button
								onClick={submitAnswer}
								disabled={!answer.trim() || createAnswer.pending}
							>
								{createAnswer.pending ? 'Posting…' : 'Post answer'}
							</Button>
						</Stack>
					</Stack>
				</Stack>
			)}
		</Stack>
	);
}
