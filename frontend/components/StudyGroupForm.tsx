'use client';

import React, { useState } from 'react';
import { Pane, Textarea, Button, majorScale, minorScale } from 'evergreen-ui';

interface FormState {
	title: string;
	category: string;
	course: string;
	date: string;
	time: string;
	location: string;
	maxParticipants: number;
	description: string;
}

const initialFormState: FormState = {
	title: '',
	category: '',
	course: '',
	date: '',
	time: '',
	location: '',
	maxParticipants: 0,
	description: '',
};

export default function StudyGroupForm(): React.ReactElement {
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
		<>
			<Pane padding={majorScale(2)} marginTop={minorScale(2)} marginBottom={minorScale(2)}>
				<h2 className='text-3xl font-bold mb-2 text-left'>Create a Study Group</h2>
				<h3 className='text-base font-normal mb-12 text-left'>
					Meet up with classmates to study, discuss course material, and more.
				</h3>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Study Group Title</label>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							placeholder='e.g., COS 226 Midterm Study Session'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Category</label>
						<input
							name='category'
							value={form.category}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							placeholder='e.g., Computer Science'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Course (Optional)</label>
						<input
							name='course'
							value={form.course}
							onChange={handleChange}
							style={{ width: '100%', padding: 8 }}
							placeholder='e.g., COS 226'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Date</label>
						<input
							name='date'
							value={form.date}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							type='date'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Time</label>
						<input
							name='time'
							value={form.time}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							type='time'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Location</label>
						<input
							name='location'
							value={form.location}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							placeholder='e.g., Frist Campus Center, Room 302'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Max Participants</label>
						<input
							name='maxParticipants'
							value={form.maxParticipants}
							onChange={handleChange}
							required
							style={{ width: '100%', padding: 8 }}
							placeholder='e.g., 8'
							type='number'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div style={{ marginBottom: minorScale(2) }}>
						<label style={{ display: 'block' }}>Description</label>
						<Textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							style={{ borderRadius: 8, fontSize: '16px' }}
							required
							rows={10}
							width='100%'
							placeholder='Describe your study group, topics to cover, what to bring, etc.'
							className='w-full p-2 rounded-md border border-gray-300 bg-gray-100'
						/>
					</div>
					<div
						style={{
							display: 'flex',
							gap: 12,
							width: '100%',
						}}
					>
						<Button appearance='primary' type='submit' size='large' style={{ flex: 8 }}>
							Create Study Group
						</Button>
						<Button
							onClick={handleCancel}
							type='button'
							size='large'
							style={{ flex: 2 }}
						>
							Cancel
						</Button>
					</div>
				</form>
				{submitted && (
					<Pane marginTop={minorScale(2)}>Sutdy Group created successfully!</Pane>
				)}
				{canceled && <Pane marginTop={minorScale(2)}>Edit canceled.</Pane>}
			</Pane>
		</>
	);
}
