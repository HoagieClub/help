'use client';

import React, { useState } from 'react';

import { Pane, Textarea, Button, majorScale, minorScale } from 'evergreen-ui';

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

export default function AskQuestion(): React.ReactElement {
	const [form, setForm] = useState<FormState>(initialFormState);
	const [submitted, setSubmitted] = useState(false);
	const [canceled, setCanceled] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setForm((prev) => ({ ...prev, category: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
		setCanceled(false);
		setForm(initialFormState);
	};

	const handleCancel = () => {
		setForm(initialFormState);
		setSubmitted(false);
		setCanceled(true);
	};

	return (
		<Pane padding={majorScale(2)} marginTop={minorScale(2)} marginBottom={minorScale(2)}>
			<h2 className='text-3xl font-bold mb-2 text-left'>Ask a Question</h2>
			<h3 className='text-base font-normal mb-12 text-left'>
				Get help from the Princeton academics community
			</h3>
			<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
				<div style={{ marginBottom: minorScale(2) }}>
					<label style={{ display: 'block' }}>Question Title</label>
					<input
						name='questionTitle'
						value={form.questionTitle}
						onChange={handleChange}
						required
						style={{ width: '100%', padding: 8 }}
						placeholder='E.g., How do I approach the graph algorithms in COS 226?'
						className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
					/>
				</div>

				<div style={{ marginBottom: minorScale(2) }}>
					<label style={{ display: 'block' }}>Category</label>
					<select
						name='category'
						value={form.category}
						onChange={handleCategoryChange}
						required
						style={{ width: '100%', padding: 8 }}
						className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
					>
						<option value='' disabled>
							Select a category
						</option>
						<option value='Assignments and PSETs'>Assignments and PSETs</option>
						<option value='Exam Prep'>Exam Prep</option>
						<option value='Resource Recommendations'>Resource Recommendations</option>
						<option value='Other'>Other</option>
					</select>
				</div>

				<div style={{ marginBottom: minorScale(2) }}>
					<label style={{ display: 'block' }}>Course (Optional)</label>
					<input
						name='course'
						value={form.course}
						onChange={handleChange}
						style={{ width: '100%', padding: 8 }}
						placeholder='E.g., COS 226'
						className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
					/>
				</div>

				<div style={{ marginBottom: minorScale(2) }}>
					<label style={{ display: 'block' }}>Details</label>
					<Textarea
						name='questionDetails'
						value={form.questionDetails}
						onChange={handleChange}
						style={{ borderRadius: 8, fontSize: '16px' }}
						required
						rows={10}
						width='100%'
						placeholder='Provide more details about your question...'
						className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
					/>
					<span className='text-base font-normal mt-1'>
						Tip: Add specific details and context to get better answers
					</span>
				</div>

				<div
					style={{
						display: 'flex',
						gap: 12,
						width: '100%',
					}}
				>
					<Button appearance='primary' type='submit' size='large' style={{ flex: 8 }}>
						Post Question
					</Button>
					<Button onClick={handleCancel} type='button' size='large' style={{ flex: 2 }}>
						Cancel
					</Button>
				</div>
			</form>

			{submitted && (
				<Pane marginTop={minorScale(2)}>Thank you for submitting your question!</Pane>
			)}
			{canceled && <Pane marginTop={minorScale(2)}>Edit canceled.</Pane>}
		</Pane>
	);
}
