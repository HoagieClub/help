import type { ReactNode } from 'react';

import Link from 'next/link';

import {
	Button,
	Card,
	Heading,
	Input,
	Message,
	QuestionCard,
	Stack,
	Tag,
	Text,
} from '@/components/ui';

/** One entry per /design/components/[name] page: live variants and one code block. */
export type ComponentDoc = { title: string; preview: ReactNode; code: string };

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
	button: {
		title: 'Button',
		preview: (
			<Stack direction='row' gap='3' align='center' wrap>
				<Button>Primary</Button>
				<Button variant='secondary'>Secondary</Button>
				<Button variant='minimal'>Minimal</Button>
				<Button variant='destructive'>Destructive</Button>
				<Button disabled>Disabled</Button>
				<Button asChild>
					<Link href='/design/components/button'>Link</Link>
				</Button>
			</Stack>
		),
		code: `<Button>Primary</Button>
<Button variant='secondary'>Secondary</Button>
<Button variant='minimal'>Minimal</Button>
<Button variant='destructive'>Destructive</Button>
<Button disabled>Disabled</Button>
<Button asChild>
  <Link href='/questions/ask'>Link</Link>
</Button>`,
	},

	tag: {
		title: 'Tag',
		preview: (
			<Stack direction='row' gap='2' align='center' wrap>
				<Tag variant='selected'>Selected</Tag>
				<Tag>Idle</Tag>
				<Tag variant='label'>COS 226</Tag>
				<Tag variant='success'>Success</Tag>
				<Tag variant='warning'>Warning</Tag>
				<Tag asChild>
					<button type='button'>Clickable</button>
				</Tag>
			</Stack>
		),
		code: `<Tag variant='selected'>Selected</Tag>
<Tag>Idle</Tag>
<Tag variant='label'>COS 226</Tag>
<Tag variant='success'>Success</Tag>
<Tag variant='warning'>Warning</Tag>
<Tag asChild variant={isOn ? 'selected' : 'idle'}>
  <button type='button' onClick={toggle}>Clickable</button>
</Tag>`,
	},

	input: {
		title: 'Input',
		preview: (
			<Stack gap='4'>
				<Input label='Default' placeholder='Placeholder' />
				<Input label='With hint' hint='Optional' placeholder='e.g. COS 226' />
				<Input label='With error' defaultValue='1' error='Must be at least 2' />
				<Input label='Disabled' disabled defaultValue='Frist 302' />
			</Stack>
		),
		code: `<Input label='Default' placeholder='Placeholder' />
<Input label='With hint' hint='Optional' />
<Input label='With error' error='Must be at least 2' />
<Input label='Disabled' disabled />`,
	},

	message: {
		title: 'Message',
		preview: (
			<Stack gap='3'>
				<Message variant='success'>Answer posted.</Message>
				<Message variant='error'>
					Couldn&apos;t post your answer. Check your connection and try again.
				</Message>
				<Message variant='warning'>This question is from last semester.</Message>
			</Stack>
		),
		code: `<Message variant='success'>Answer posted.</Message>
<Message variant='error'>Couldn't post your answer. Check your connection and try again.</Message>
<Message variant='warning'>This question is from last semester.</Message>`,
	},

	'question-card': {
		title: 'Question card',
		preview: (
			<div className='rounded-md bg-surface-gray p-6'>
				<Stack gap='4'>
					<QuestionCard
						course='COS 226'
						meta='Asked by Ava · 2h ago'
						title='How do I handle the two-children case in BST delete?'
						preview='I get insertion, but deletion breaks when the node has two children. Do I swap with the successor or the predecessor, and how do I fix the parent pointers afterward?'
						hearts={12}
						answers={3}
						liked
						href='/design/components/question-card'
					/>
					<QuestionCard
						course='ORF 309'
						meta='Asked by Sam · 1d ago'
						title='Best way to review for the midterm?'
						preview='Looking for practice problems beyond the problem sets.'
						hearts={4}
						answers={1}
						liked={false}
					/>
				</Stack>
			</div>
		),
		code: `<QuestionCard
  course='COS 226'
  meta='Asked by Ava · 2h ago'
  title='How do I handle the two-children case in BST delete?'
  preview='I get insertion, but deletion breaks when…'
  hearts={12}
  answers={3}
  liked
  href='/questions/1'
/>`,
	},

	card: {
		title: 'Card',
		preview: (
			<Stack gap='4'>
				<Card>
					<Text>Default (padding md)</Text>
				</Card>
				<Card padding='sm' interactive>
					<Text>Interactive, padding sm</Text>
				</Card>
			</Stack>
		),
		code: `<Card>…</Card>
<Card padding='sm' interactive>…</Card>`,
	},

	stack: {
		title: 'Stack',
		preview: (
			<Stack gap='4'>
				<Stack gap='2'>
					<Tag>Column</Tag>
					<Tag>gap 2</Tag>
				</Stack>
				<Stack direction='row' gap='2' align='center' wrap>
					<Tag>Row</Tag>
					<Tag>gap 2</Tag>
					<Tag>wrap</Tag>
				</Stack>
			</Stack>
		),
		code: `<Stack gap='2'>…</Stack>
<Stack direction='row' gap='2' align='center' wrap>…</Stack>`,
	},

	text: {
		title: 'Text',
		preview: (
			<Stack gap='1'>
				<Text>Default</Text>
				<Text tone='muted'>Muted</Text>
				<Text tone='brand'>Brand</Text>
				<Text tone='success'>Success</Text>
				<Text tone='warning'>Warning</Text>
				<Text tone='danger'>Danger</Text>
			</Stack>
		),
		code: `<Text>Default</Text>
<Text tone='muted'>Muted</Text>
<Text variant='small' tone='brand'>Brand</Text>`,
	},

	heading: {
		title: 'Heading',
		preview: (
			<Stack gap='2'>
				<Heading variant='h1'>Heading</Heading>
				<Heading variant='h1' tone='ink'>
					Ink
				</Heading>
				<Heading variant='h1' tone='brand'>
					Brand
				</Heading>
			</Stack>
		),
		code: `<Heading variant='h1'>Heading</Heading>
<Heading variant='h2' tone='ink'>Ink</Heading>
<Heading variant='display' tone='brand'>Brand</Heading>`,
	},
};
