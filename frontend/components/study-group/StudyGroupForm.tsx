'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import Link from 'next/link';

import { BackLink, Button, Card, Heading, Input, Message, Stack, Textarea } from '@/components/ui';
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

/** Used when Max Participants is left empty; the API requires a number. */
const DEFAULT_MAX_SPOTS = 10;

const EMPTY_FORM: FormState = {
	title: '',
	category: '',
	course: '',
	date: '',
	time: '',
	location: '',
	maxParticipants: '',
	description: '',
};

export type StudyGroupFormProps = {
	/** Where Back and Cancel go. */
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
			max_spots: Number(form.maxParticipants) || DEFAULT_MAX_SPOTS,
			members: [],
		});
		if (result) {
			setCreated(true);
			setForm(EMPTY_FORM);
		}
	}

	return (
		<div className='mx-auto max-w-xl px-4 py-8'>
			<Stack gap='6'>
				<BackLink href={backHref} />

				<Card>
					<form className='flex flex-col gap-4' onSubmit={submit}>
						<Heading variant='h3' as='h1'>
							Create Study Group
						</Heading>
						{created && (
							<Message variant='success'>Study group created successfully!</Message>
						)}
						<Input
							label='Study Group Title'
							name='title'
							value={form.title}
							onChange={update}
							required
							placeholder='e.g., COS 226 Algorithms Study Session'
						/>
						<Input
							label='Category'
							name='category'
							value={form.category}
							onChange={update}
							required
							placeholder='e.g., Computer Science'
						/>
						<Input
							label='Course (Optional)'
							name='course'
							value={form.course}
							onChange={update}
							placeholder='e.g., COS 226'
						/>
						<Input
							label='Date'
							name='date'
							type='date'
							value={form.date}
							onChange={update}
							required
						/>
						<Input
							label='Time'
							name='time'
							type='time'
							value={form.time}
							onChange={update}
							required
						/>
						<Input
							label='Location'
							name='location'
							value={form.location}
							onChange={update}
							required
							placeholder='e.g., Frist Campus Center, Room 302'
						/>
						<Input
							label='Max Participants (Optional)'
							name='maxParticipants'
							type='number'
							min={2}
							value={form.maxParticipants}
							onChange={update}
							placeholder='e.g., 8'
						/>
						<Textarea
							label='Description'
							name='description'
							rows={4}
							value={form.description}
							onChange={update}
							required
							placeholder='Describe your study group, topics to cover, what to bring, etc.'
						/>
						{createStudyGroup.error && (
							<Message variant='error'>{createStudyGroup.error}</Message>
						)}
						<Stack direction='row' gap='3'>
							<div className='flex-1'>
								<Button type='submit' fullWidth disabled={createStudyGroup.pending}>
									{createStudyGroup.pending ? 'Creating…' : 'Create Study Group'}
								</Button>
							</div>
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
