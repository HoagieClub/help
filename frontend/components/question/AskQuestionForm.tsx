'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import {
	Button,
	Card,
	Checkbox,
	Input,
	Message,
	PageHeader,
	Select,
	Stack,
	Textarea,
} from '@/components/ui';
import { useCreateQuestion } from '@/hooks/mutations';

const CATEGORY_OPTIONS = [
	{ label: 'Assignments and PSETs', value: 'Assignments and PSETs' },
	{ label: 'Exam Prep', value: 'Exam Prep' },
	{ label: 'Resource Recommendations', value: 'Resource Recommendations' },
	{ label: 'Other', value: 'Other' },
];

type FormState = {
	title: string;
	category: string;
	course: string;
	details: string;
	anonymous: boolean;
};

const EMPTY_FORM: FormState = {
	title: '',
	category: '',
	course: '',
	details: '',
	anonymous: false,
};

export type AskQuestionFormProps = {
	/** Where Back and Cancel go. */
	backHref?: string;
};

/**
 * The full "Ask a Question" page: title, category, course, details and anonymous toggle.
 *
 * @example
 * <AskQuestionForm />
 */
export function AskQuestionForm({ backHref = '/questions' }: AskQuestionFormProps) {
	const [form, setForm] = useState<FormState>(EMPTY_FORM);
	const [categoryMissing, setCategoryMissing] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const createQuestion = useCreateQuestion();

	function update(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) {
		const { name, value } = event.target;
		setForm((previous) => ({ ...previous, [name]: value }));
		if (name === 'category') {
			setCategoryMissing(false);
		}
	}

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!form.category) {
			setCategoryMissing(true);
			return;
		}
		const created = await createQuestion.run({
			title: form.title,
			tags: [],
			course: form.course.trim() || null,
			details: form.details,
			hearts: 0,
			view: 0,
			user_is_anonymous: form.anonymous,
		});
		if (created) {
			setSubmitted(true);
		}
	}

	return (
		<div className='mx-auto max-w-2xl px-4 py-8'>
			<Stack gap='6'>
				<div>
					<Button variant='minimal' asChild>
						<Link href={backHref}>
							<ArrowLeft aria-hidden='true' className='h-4 w-4' />
							Back
						</Link>
					</Button>
				</div>

				<PageHeader
					title='Ask a Question'
					description='Get help from the Hoagie academics community'
				/>

				<Card padding='lg'>
					{submitted ? (
						<Stack gap='4' align='start'>
							<Message variant='success'>
								Thank you for submitting your question!
							</Message>
							<Button asChild>
								<Link href={backHref}>Back to Q&amp;A</Link>
							</Button>
						</Stack>
					) : (
						<form className='flex flex-col gap-6' onSubmit={submit}>
							<Input
								label='Question title'
								name='title'
								value={form.title}
								onChange={update}
								required
								placeholder='e.g. How do I approach the graph algorithms in COS 226?'
							/>
							<Select
								label='Category'
								name='category'
								placeholder='Select a category'
								options={CATEGORY_OPTIONS}
								value={form.category}
								onChange={update}
								error={
									categoryMissing
										? 'Please select a category before submitting.'
										: undefined
								}
							/>
							<Input
								label='Course'
								name='course'
								hint='Optional'
								value={form.course}
								onChange={update}
								placeholder='e.g. COS 226'
							/>
							<Textarea
								label='Details'
								name='details'
								rows={6}
								value={form.details}
								onChange={update}
								required
								hint='Tip: add specific details and context to get better answers'
								placeholder='Provide more details about your question…'
							/>
							<Checkbox
								label='Post anonymously'
								checked={form.anonymous}
								onChange={(e) =>
									setForm((previous) => ({
										...previous,
										anonymous: e.target.checked,
									}))
								}
							/>
							{createQuestion.error && (
								<Message variant='error'>{createQuestion.error}</Message>
							)}
							<Stack direction='row' gap='2'>
								<Button type='submit' disabled={createQuestion.pending}>
									{createQuestion.pending ? 'Posting…' : 'Post Question'}
								</Button>
								<Button variant='secondary' asChild>
									<Link href={backHref}>Cancel</Link>
								</Button>
							</Stack>
						</form>
					)}
				</Card>
			</Stack>
		</div>
	);
}
