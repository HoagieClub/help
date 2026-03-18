'use client';

import React, { useState } from 'react';

import {
	ArrowLeftIcon,
	Button,
	Heading,
	Pane,
	SelectMenu,
	Text,
	TextInput,
	Textarea,
	majorScale,
} from 'evergreen-ui';
import { useRouter } from 'next/navigation';

interface FormState {
	questionTitle: string;
	category: string;
	course: string;
	questionDetails: string;
}

const initialFormState: FormState = {
	questionTitle: '',
	category: '',
	course: '',
	questionDetails: '',
};

const CATEGORY_OPTIONS = [
	{ label: 'Assignments and PSETs', value: 'Assignments and PSETs' },
	{ label: 'Exam Prep', value: 'Exam Prep' },
	{ label: 'Resource Recommendations', value: 'Resource Recommendations' },
	{ label: 'Other', value: 'Other' },
];

export default function AskQuestion(): React.ReactElement {
	const router = useRouter();
	const [form, setForm] = useState<FormState>(initialFormState);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		setForm(initialFormState);
	};

	const handleCancel = () => {
		setForm(initialFormState);
		router.push('/questions');
	};

	const handleBack = () => {
		router.push('/questions');
	};

	return (
		<Pane
			display='flex'
			flexDirection='column'
			alignItems='center'
			paddingTop={majorScale(4)}
			paddingBottom={majorScale(6)}
			paddingX={majorScale(2)}
		>
			{/* Back button */}
			<Pane width='100%' maxWidth='720px' marginBottom={majorScale(2)}>
				<Button
					appearance='minimal'
					iconBefore={ArrowLeftIcon}
					onClick={handleBack}
					paddingLeft={0}
					fontWeight={500}
				>
					Back
				</Button>
			</Pane>

			{/* Header */}
			<Pane width='100%' maxWidth='720px' marginBottom={majorScale(3)}>
				<Heading size={800} fontWeight={700} marginBottom={4}>
					Ask a Question
				</Heading>
				<Text size={400} color='muted'>
					Get help from the Hoagie academics community
				</Text>
			</Pane>

			{/* Form card */}
			<Pane
				width='100%'
				maxWidth='720px'
				background='white'
				border='default'
				borderRadius={8}
				padding={majorScale(4)}
			>
				{submitted ? (
					<Pane textAlign='center' paddingY={majorScale(4)}>
						<Heading size={600} marginBottom={majorScale(2)}>
							Thank you for submitting your question!
						</Heading>
						<Button appearance='primary' onClick={handleBack}>
							Back to Q&A
						</Button>
					</Pane>
				) : (
					<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
						{/* Question Title */}
						<div>
							<label className='block text-sm font-semibold mb-1'>
								Question Title
							</label>
							<TextInput
								name='questionTitle'
								value={form.questionTitle}
								onChange={handleChange}
								required
								placeholder='e.g. How do I approach the graph algorithms in COS 226?'
								width='100%'
							/>
						</div>

						{/* Category */}
						<div>
							<label className='block text-sm font-semibold mb-1'>Category</label>
							<SelectMenu
								options={CATEGORY_OPTIONS}
								selected={form.category}
								onSelect={(item) =>
									setForm((prev) => ({ ...prev, category: item.value as string }))
								}
								hasTitle={false}
								hasFilter={false}
							>
								<Button type='button' width='100%'>
									{form.category || 'Select a category'}
								</Button>
							</SelectMenu>
						</div>

						{/* Course */}
						<div>
							<label className='block text-sm font-semibold mb-1'>
								Course (Optional)
							</label>
							<TextInput
								name='course'
								value={form.course}
								onChange={handleChange}
								placeholder='e.g. COS 226'
								width='100%'
							/>
						</div>

						{/* Details */}
						<div>
							<label className='block text-sm font-semibold mb-1'>Details</label>
							<Textarea
								name='questionDetails'
								value={form.questionDetails}
								onChange={handleChange}
								required
								rows={6}
								width='100%'
								placeholder='Provide more details about your question...'
								style={{ borderRadius: 6, fontSize: '14px', resize: 'vertical' }}
							/>
							<Text size={300} color='muted' marginTop={4} display='block'>
								Tip: Add specific details and context to get better answers
							</Text>
						</div>

						{/* Buttons */}
						<div className='flex gap-3 mt-2'>
							<Button type='submit' appearance='primary' flex={1}>
								Post Question
							</Button>
							<Button type='button' onClick={handleCancel}>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</Pane>
		</Pane>
	);
}
