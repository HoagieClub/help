'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import {
	Button,
	Byline,
	Checkbox,
	Heading,
	HeartButton,
	Message,
	Stack,
	Tag,
	Text,
	Textarea,
} from '@/components/ui';
import { useCreateAnswer } from '@/hooks/mutations';
import { useHeart } from '@/hooks/useHeart';
import { formatTimePassed } from '@/lib/format';

export type QuestionPanelProps = {
	questionId: string;
	/** Display name of the asker. Ignored when `anonymous` is true. */
	author: string;
	anonymous: boolean;
	title: string;
	course: string | null;
	tags: string[];
	details: string;
	createdAt: string;
	hearts: number;
	/** Called after an answer is posted, so the page can reload its answers. */
	onAnswerPosted?: () => void;
};

/**
 * The top of a question page: title, asker, tags, body, heart and the answer box.
 *
 * @example
 * <QuestionPanel
 *   questionId='1'
 *   author='Jordan Lee'
 *   anonymous={false}
 *   title='How do I implement a BST?'
 *   course='COS 226'
 *   tags={['python']}
 *   details='…'
 *   createdAt={question.create_time}
 *   hearts={42}
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
	hearts,
	onAnswerPosted,
}: QuestionPanelProps) {
	const heart = useHeart({ kind: 'question', id: questionId, initialCount: hearts });
	const createAnswer = useCreateAnswer();
	const [isAnswering, setIsAnswering] = useState(false);
	const [answer, setAnswer] = useState('');
	const [answerAnonymous, setAnswerAnonymous] = useState(false);

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
			setAnswer('');
			setAnswerAnonymous(false);
			setIsAnswering(false);
			onAnswerPosted?.();
		}
	}

	return (
		<Stack gap='6'>
			<Heading variant='h1' tone='ink'>
				{title}
			</Heading>

			<Byline
				name={author}
				anonymous={anonymous}
				meta={`Asked ${formatTimePassed(createdAt)}`}
				size='lg'
			/>

			{(course || tags.length > 0) && (
				<Stack direction='row' gap='2' align='center' wrap>
					{course && <Tag variant='label'>{course}</Tag>}
					{tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Stack>
			)}

			<div className='break-words whitespace-pre-wrap'>
				<Text variant='body-lg'>{details}</Text>
			</div>

			<Stack direction='row' gap='4' align='center'>
				<HeartButton {...heart} thing='question' />
				{!isAnswering && (
					<Button variant='minimal' onClick={() => setIsAnswering(true)}>
						Answer
					</Button>
				)}
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
							<Button variant='secondary' onClick={() => setIsAnswering(false)}>
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
