'use client';

import React, { useState } from 'react';

import { CaretUpIcon } from '@phosphor-icons/react';
import { Avatar, Checkbox, Heading, Pane, Text } from 'evergreen-ui';
import { toast } from 'sonner';

import { createNewAnswer } from '@/api/answerService';
import { formatTimePassed } from '@/components/utils';

interface QuestionPanelProps {
	questionId: number;
	user: string;
	title: string;
	tags: string[];
	course: string | null;
	details: string;
	create_time: string;
	user_is_anonymous: boolean;
	hearts: number;
}

const QuestionPanel = ({
	questionId,
	user,
	title,
	tags,
	course,
	details,
	create_time,
	user_is_anonymous,
	hearts,
}: QuestionPanelProps) => {
	const displayName = user_is_anonymous ? 'Anonymous' : user;
	const timeAgo = formatTimePassed(create_time);

	const [showAnswerBox, setShowAnswerBox] = useState(false);
	const [answer, setAnswer] = useState('');
	const [answerAnonymous, setAnswerAnonymous] = useState(false);

	const handleReply = () => {
		setShowAnswerBox(true);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAnswer(event.target.value);
	};

	// TODO: Add error handling (try/catch) and show an error toast if the API call fails
	// TODO: Refresh the answers list after successful submission
	const handleSubmitAnswer = async () => {
		if (answer.trim()) {
			await createNewAnswer(questionId.toString(), {
				text: answer,
				is_anonymous: answerAnonymous,
			});
			toast.success('Answer Submitted!', {
				description: 'Your answer has been posted successfully.',
			});
			setAnswer('');
			setShowAnswerBox(false);
		}
	};

	return (
		<Pane className='max-w-[700px] mx-auto justify-center'>
			{/* Title */}
			<Heading className='text-3xl font-bold text-gray-900 mb-6'>{title}</Heading>

			{/* Author row */}
			<Pane className='flex items-center gap-3 mb-6'>
				<Avatar name={displayName} size={78} color='black' backgroundColor='#e6e8f0' />
				<Pane>
					<Text className='text-xl font-bold text-gray-900 block'>{displayName}</Text>
					<Text className='text-sm text-gray-500'>Q&A • {timeAgo}</Text>
				</Pane>
			</Pane>

			{/* Tags + upvotes row */}
			<Pane className='flex items-center gap-2 mb-6 flex-wrap'>
				{course && (
					<Text className='px-3 py-1 rounded-[10px] bg-[#EF4343] text-white text-xs font-medium'>
						{course}
					</Text>
				)}
				{tags.map((tag) => (
					<Text
						key={tag}
						className='px-3 py-1 rounded-[10px] bg-[#D9D9D9] text-gray-600 text-xs'
					>
						{tag}
					</Text>
				))}
				<Pane className='flex items-center gap-1 ml-2'>
					<CaretUpIcon size={14} weight='fill' color='#6b7280' />
					<Text className='text-sm text-gray-500'>{hearts} Upvotes</Text>
				</Pane>
			</Pane>

			{/* Question body */}
			<Text className='text-gray-900 leading-relaxed mb-4 whitespace-pre-wrap break-words block'>
				{details}
			</Text>

			{/* Action buttons */}
			<Pane className='flex items-center gap-6'>
				<Pane
					className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer'
					// TODO: Implement upvote functionality
					onClick={() => {}}
				>
					<CaretUpIcon size={14} weight='fill' />
					<Text className='text-sm text-gray-600'>Upvote ({hearts})</Text>
				</Pane>
				{!showAnswerBox && (
					<Text
						className='text-sm text-gray-600 hover:text-gray-900 cursor-pointer'
						onClick={handleReply}
					>
						Reply
					</Text>
				)}
			</Pane>

			{showAnswerBox && (
				<Pane className='mt-6 flex flex-col items-end gap-3'>
					<textarea
						value={answer}
						onChange={handleInputChange}
						placeholder='Write your answer here...'
						rows={4}
						className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4343] focus:border-transparent text-gray-900 resize-none'
					/>
					<Pane className='flex items-center justify-between w-full'>
						<Checkbox
							label='Post anonymously'
							checked={answerAnonymous}
							onChange={(e) => setAnswerAnonymous(e.target.checked)}
						/>
						<button
							onClick={handleSubmitAnswer}
							className='px-6 py-2 bg-[#EF4343] text-white rounded-lg hover:bg-[#d63838] transition-colors duration-200 text-sm font-medium'
						>
							Submit
						</button>
					</Pane>
				</Pane>
			)}
		</Pane>
	);
};

export default QuestionPanel;
