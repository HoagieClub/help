'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import Link from 'next/link';

import { Button, Card, Input, Message, PageHeader, Stack, Textarea } from '@/components/ui';
import { useCreateStudyGroup } from '@/hooks/mutations';

type FormState = {
	title: string;
	category: string;
	course: string;
	date: string;
	time: string;
	location: string;
	maxParticipants: string;
	description: string;
};

const EMPTY_FORM: FormState = {
	title: '',
	category: '',
	course: '',
	date: '',
	time: '',
	location: '',
	maxParticipants: '5',
	description: '',
};

export type StudyGroupFormProps = {
	/** Where Cancel goes. */
	backHref?: string;
};

/**
 * The full "Create a Study Group" page.
 *
 * Category, course and location are collected but not saved yet: the backend has no fields
 * for them (see the backend tickets).
 *
 * @example
 * <StudyGroupForm />
 */
export function StudyGroupForm({ backHref = '/study-groups' }: StudyGroupFormProps) {
	const [form, setForm] = useState<FormState>(EMPTY_FORM);
	const [created, setCreated] = useState(false);
	const createStudyGroup = useCreateStudyGroup();

	function update(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setForm((previous) => ({ ...previous, [name]: value }));
	}

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const result = await createStudyGroup.run({
			title: form.title,
			description: form.description,
			meeting_datetime: `${form.date} ${form.time}`,
			max_spots: Number(form.maxParticipants),
			members: [],
		});
		if (result) {
			setCreated(true);
			setForm(EMPTY_FORM);
		}
	}

	return (
		<div className='mx-auto max-w-2xl px-4 py-8'>
			<Stack gap='6'>
				<PageHeader
					title='Create a Study Group'
					description='Meet up with classmates to study, discuss course material, and more.'
				/>

				<Card>
					<form className='flex flex-col gap-6' onSubmit={submit}>
						{created && (
							<Message variant='success'>Study group created successfully!</Message>
						)}
						<Input
							label='Study group title'
							name='title'
							value={form.title}
							onChange={update}
							required
							placeholder='e.g. COS 226 Midterm Study Session'
						/>
						<Input
							label='Category'
							name='category'
							value={form.category}
							onChange={update}
							required
							placeholder='e.g. Computer Science'
						/>
						<Input
							label='Course'
							name='course'
							hint='Optional'
							value={form.course}
							onChange={update}
							placeholder='e.g. COS 226'
						/>
						<Stack direction='row' gap='4' wrap>
							<div className='min-w-0 flex-1'>
								<Input
									label='Date'
									name='date'
									type='date'
									value={form.date}
									onChange={update}
									required
								/>
							</div>
							<div className='min-w-0 flex-1'>
								<Input
									label='Time'
									name='time'
									type='time'
									value={form.time}
									onChange={update}
									required
								/>
							</div>
						</Stack>
						<Input
							label='Location'
							name='location'
							value={form.location}
							onChange={update}
							required
							placeholder='e.g. Frist Campus Center, Room 302'
						/>
						<Input
							label='Max participants'
							name='maxParticipants'
							type='number'
							min={2}
							value={form.maxParticipants}
							onChange={update}
							required
						/>
						<Textarea
							label='Description'
							name='description'
							rows={6}
							value={form.description}
							onChange={update}
							required
							placeholder='Describe your study group, topics to cover, what to bring, etc.'
						/>
						{createStudyGroup.error && (
							<Message variant='error'>{createStudyGroup.error}</Message>
						)}
						<Stack direction='row' gap='2'>
							<Button type='submit' disabled={createStudyGroup.pending}>
								{createStudyGroup.pending ? 'Creating…' : 'Create Study Group'}
							</Button>
							<Button variant='secondary' asChild>
								<Link href={backHref}>Cancel</Link>
							</Button>
						</Stack>
					</form>
				</Card>
			</Stack>
		</div>
	);
}
