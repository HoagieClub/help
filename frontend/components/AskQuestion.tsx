'use client';

import React, { useState } from 'react';

import {
	ArrowLeftIcon,
	Button,
	Heading,
	Label,
	Pane,
	SelectMenu,
	Text,
	TextInput,
	Textarea,
	majorScale,
} from 'evergreen-ui';
import Link from 'next/link';

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
	const [form, setForm] = useState<FormState>(initialFormState);
	const [submitted, setSubmitted] = useState(false);
	const [categoryError, setCategoryError] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!form.category) {
			setCategoryError(true);
			return;
		}
		// TODO: API request to submit a question
		setSubmitted(true);
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
				<Link href='/questions' style={{ textDecoration: 'none' }}>
					<Button
						appearance='minimal'
						iconBefore={ArrowLeftIcon}
						paddingLeft={0}
						fontWeight={500}
					>
						Back
					</Button>
				</Link>
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
						<Link href='/questions' style={{ textDecoration: 'none' }}>
							<Button appearance='primary'>Back to Q&A</Button>
						</Link>
					</Pane>
				) : (
					<form onSubmit={handleSubmit}>
						<Pane display='flex' flexDirection='column' gap={majorScale(3)}>
							{/* Question Title */}
							<Pane>
								<Label htmlFor='questionTitle' display='block' marginBottom={4}>
									Question Title
								</Label>
								<TextInput
									id='questionTitle'
									name='questionTitle'
									value={form.questionTitle}
									onChange={handleChange}
									required
									placeholder='e.g. How do I approach the graph algorithms in COS 226?'
									width='100%'
								/>
							</Pane>

							{/* Category */}
							<Pane>
								<Label htmlFor='category' display='block' marginBottom={4}>
									Category
								</Label>
								<SelectMenu
									options={CATEGORY_OPTIONS}
									selected={form.category}
									onSelect={(item) => {
										setCategoryError(false);
										setForm((prev) => ({
											...prev,
											category: item.value as string,
										}));
									}}
									hasTitle={false}
									hasFilter={false}
								>
									<Button id='category' type='button' width='100%'>
										{form.category || 'Select a category'}
									</Button>
								</SelectMenu>
								{categoryError && (
									<Text size={300} color='danger' marginTop={4} display='block'>
										Please select a category before submitting.
									</Text>
								)}
							</Pane>

							{/* Course */}
							<Pane>
								<Label htmlFor='course' display='block' marginBottom={4}>
									Course (Optional)
								</Label>
								<TextInput
									id='course'
									name='course'
									value={form.course}
									onChange={handleChange}
									placeholder='e.g. COS 226'
									width='100%'
								/>
							</Pane>

							{/* Details */}
							<Pane>
								<Label htmlFor='questionDetails' display='block' marginBottom={4}>
									Details
								</Label>
								<Textarea
									id='questionDetails'
									name='questionDetails'
									value={form.questionDetails}
									onChange={handleChange}
									required
									rows={6}
									width='100%'
									placeholder='Provide more details about your question...'
									style={{
										borderRadius: 6,
										fontSize: '14px',
										resize: 'vertical',
									}}
								/>
								<Text size={300} color='muted' marginTop={4} display='block'>
									Tip: Add specific details and context to get better answers
								</Text>
							</Pane>

							{/* Buttons */}
							<Pane display='flex' gap={majorScale(1)} marginTop={majorScale(1)}>
								<Button type='submit' appearance='primary' flex={1}>
									Post Question
								</Button>
								<Link href='/questions' style={{ textDecoration: 'none' }}>
									<Button type='button'>Cancel</Button>
								</Link>
							</Pane>
						</Pane>
					</form>
				)}
			</Pane>
		</Pane>
	);
}
