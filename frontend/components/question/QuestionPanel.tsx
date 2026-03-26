'use client';

import { Avatar, Heading, Pane, Text } from 'evergreen-ui';
import { CaretUpIcon } from '@phosphor-icons/react';

import { formatTimePassed } from '../utils';

interface QuestionPanelProps {
	user: string;
	title: string;
	tags: string[];
	course: string | null;
	details: string;
	create_time: Date | string;
	user_is_anonymous: boolean;
	hearts: number;
}

const QuestionPanel = ({
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
	const timeAgo = formatTimePassed(
		create_time instanceof Date ? create_time.toISOString() : create_time
	);

	return (
		<Pane className='max-w-[700px] mx-auto justify-center'>
			{/* Title */}
			<Heading className='text-3xl font-bold text-gray-900 mb-6'>{title}</Heading>

			{/* Author row */}
			<Pane className='flex items-center gap-3 mb-6'>
				<Avatar name={displayName} size={78} color={'black'} backgroundColor={'#e6e8f0'} />
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
			<Text className='text-gray-900  leading-relaxed mb-4 whitespace-pre-wrap break-words block'>
				{details}
			</Text>

			{/* Action buttons */}
			<Pane className='flex items-center gap-6'>
				<Pane
					className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer'
					onClick={() => {}}
				>
					<CaretUpIcon size={14} weight='fill' />
					<Text className='text-sm text-gray-600'>Upvote ({hearts})</Text>
				</Pane>
				<Text className='text-sm text-gray-600 hover:text-gray-900 cursor-pointer'>
					Reply
				</Text>
			</Pane>
		</Pane>
	);
};

export default QuestionPanel;
