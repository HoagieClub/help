import type { ReactNode } from 'react';

import { Calendar, Search } from 'lucide-react';
import Link from 'next/link';

import { QuestionCard } from '@/components/question/QuestionCard';
import {
	Avatar,
	Button,
	Byline,
	Card,
	Checkbox,
	Divider,
	EmptyState,
	ExpandableText,
	Heading,
	IconButton,
	Input,
	Message,
	PageHeader,
	Select,
	Spinner,
	Stack,
	Tag,
	Text,
	Textarea,
} from '@/components/ui';

import { HeartDemo, TabsDemo } from './demos';

/** One entry per /design/components/[name] page: live variants and one code block. */
export type ComponentDoc = {
	title: string;
	preview: ReactNode;
	code: string;
	/** false for components a designer still needs to add to the Figma kit. */
	inFigma?: boolean;
};

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

	avatar: {
		title: 'Avatar',
		inFigma: false,
		preview: (
			<Stack direction='row' gap='4' align='center' wrap>
				<Avatar name='Ava Fonss' />
				<Avatar name='Sam Patel' size='md' />
				<Avatar name='Jordan Lee' size='lg' />
				<Avatar name='Anonymous' anonymous size='md' />
			</Stack>
		),
		code: `<Avatar name='Ava Fonss' />
<Avatar name='Sam Patel' size='md' />
<Avatar name='Jordan Lee' size='lg' />
<Avatar name='Anonymous' anonymous />`,
	},

	byline: {
		title: 'Byline',
		inFigma: false,
		preview: (
			<Stack gap='4'>
				<Byline name='Alex Chen' meta='1 hr ago' />
				<Byline name='Sam Patel' anonymous meta='45 mins ago' />
				<Byline name='Jordan Lee' meta='Asked 3 hrs ago' size='lg' />
			</Stack>
		),
		code: `<Byline name='Alex Chen' meta='1 hr ago' />
<Byline name='Sam Patel' anonymous meta='45 mins ago' />
<Byline name='Jordan Lee' meta='Asked 3 hrs ago' size='lg' />`,
	},

	textarea: {
		title: 'Textarea',
		inFigma: false,
		preview: (
			<Stack gap='4'>
				<Textarea label='Details' placeholder='Add details…' />
				<Textarea label='With error' error='Please add some details' />
			</Stack>
		),
		code: `<Textarea label='Details' rows={6} placeholder='Add details…' />
<Textarea label='Write a comment' hideLabel rows={3} />
<Textarea label='With error' error='Please add some details' />`,
	},

	select: {
		title: 'Select',
		inFigma: false,
		preview: (
			<Select
				label='Category'
				placeholder='Select a category'
				options={[
					{ value: 'cs', label: 'Computer Science' },
					{ value: 'math', label: 'Mathematics' },
				]}
			/>
		),
		code: `<Select
  label='Category'
  placeholder='Select a category'
  options={[{ value: 'cs', label: 'Computer Science' }]}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>`,
	},

	checkbox: {
		title: 'Checkbox',
		inFigma: false,
		preview: (
			<Stack gap='2'>
				<Checkbox label='Post anonymously' />
				<Checkbox label='Checked' defaultChecked />
				<Checkbox label='Disabled' disabled />
			</Stack>
		),
		code: `<Checkbox
  label='Post anonymously'
  checked={anonymous}
  onChange={(e) => setAnonymous(e.target.checked)}
/>`,
	},

	'icon-button': {
		title: 'Icon button',
		inFigma: false,
		preview: (
			<Stack direction='row' gap='3' align='center'>
				<IconButton icon={Calendar} label='Pick a date' />
				<IconButton icon={Search} label='Search' variant='secondary' />
				<IconButton icon={Calendar} label='Pick a date' size='sm' />
			</Stack>
		),
		code: `import { Calendar } from 'lucide-react';

<IconButton icon={Calendar} label='Pick a date' onClick={openPicker} />
<IconButton icon={Search} label='Search' variant='secondary' />
<IconButton icon={Calendar} label='Pick a date' size='sm' />`,
	},

	'heart-button': {
		title: 'Heart button',
		inFigma: false,
		preview: (
			<Stack direction='row' gap='6' align='center'>
				<HeartDemo initialHearted={false} />
				<HeartDemo initialHearted />
			</Stack>
		),
		code: `const heart = useHeart({ kind: 'answer', id: answer.id, initialCount: answer.hearts });

<HeartButton {...heart} thing='answer' />`,
	},

	tabs: {
		title: 'Tabs',
		inFigma: false,
		preview: <TabsDemo />,
		code: `const [tab, setTab] = useState<'questions' | 'answers'>('questions');

<Tabs
  label='Posts'
  items={[
    { value: 'questions', label: 'Questions' },
    { value: 'answers', label: 'Answers' },
  ]}
  value={tab}
  onChange={setTab}
/>`,
	},

	spinner: {
		title: 'Spinner',
		inFigma: false,
		preview: (
			<Stack direction='row' gap='8' align='center'>
				<Spinner />
				<Spinner size='sm' label='Posting…' />
			</Stack>
		),
		code: `<Spinner />
<Spinner size='sm' label='Posting…' />`,
	},

	'empty-state': {
		title: 'Empty state',
		inFigma: false,
		preview: (
			<EmptyState
				title='No study groups yet'
				description='Start one for your next exam.'
				action={<Button>Create Study Group</Button>}
			/>
		),
		code: `<EmptyState
  title='No study groups yet'
  description='Start one for your next exam.'
  action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
/>`,
	},

	'expandable-text': {
		title: 'Expandable text',
		inFigma: false,
		preview: (
			<ExpandableText
				limit={120}
				text="I get insertion, but deletion breaks when the node has two children. Do I swap with the in-order successor or the predecessor? And afterward, how do I fix the parent pointers so the rest of the tree stays connected? I've drawn it out three times and keep losing a subtree."
			/>
		),
		code: `<ExpandableText text={answer.text} />
<ExpandableText text={comment.text} limit={120} />`,
	},

	'page-header': {
		title: 'Page header',
		inFigma: false,
		preview: (
			<PageHeader
				title='Study Groups'
				description='Find classmates and form study groups'
				action={<Button>Create Study Group</Button>}
			/>
		),
		code: `<PageHeader
  title='Study Groups'
  description='Find classmates and form study groups'
  action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
/>`,
	},

	divider: {
		title: 'Divider',
		inFigma: false,
		preview: (
			<Stack gap='3'>
				<Text>Above</Text>
				<Divider />
				<Text>Below</Text>
			</Stack>
		),
		code: `<Divider />`,
	},
};
