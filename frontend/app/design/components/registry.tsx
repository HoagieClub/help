import type { ReactNode } from 'react';

import { Calendar, Eye, Search, Triangle } from 'lucide-react';

import { QuestionCard } from '@/components/question/QuestionCard';
import {
	Avatar,
	BackLink,
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
	MetaRow,
	PageHeader,
	Select,
	Spinner,
	Stack,
	Stat,
	Tag,
	Text,
	Textarea,
	ThreadItem,
} from '@/components/ui';

import { FilterDemo, StudyGroupCardDemo, TabsDemo, UpvoteDemo } from './demos';

/** One entry per /design/components/[name] page: live variants and one code block. */
export type ComponentDoc = {
	title: string;
	preview: ReactNode;
	code: string;
	/** false for components a designer still needs to add to Figma. */
	inFigma?: boolean;
};

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
	button: {
		title: 'Button',
		preview: (
			<Stack gap='4'>
				<Stack direction='row' gap='3' align='center' wrap>
					<Button>Post Question</Button>
					<Button variant='success'>Ask Question</Button>
					<Button variant='secondary'>Cancel</Button>
					<Button variant='ghost' size='sm'>
						Sign In
					</Button>
					<Button variant='destructive'>Delete</Button>
					<Button disabled>Disabled</Button>
				</Stack>
				<Stack direction='row' gap='4' align='center'>
					<Button variant='link' size='inline'>
						Reply
					</Button>
				</Stack>
			</Stack>
		),
		code: `<Button>Post Question</Button>
<Button variant='success' asChild>
  <Link href='/questions/ask'>Ask Question</Link>
</Button>
<Button variant='secondary'>Cancel</Button>
<Button variant='ghost' size='sm'>Sign In</Button>
<Button variant='destructive'>Delete</Button>
<Button variant='link' size='inline'>Reply</Button>`,
	},

	'back-link': {
		title: 'Back link',
		preview: <BackLink href='/design' />,
		code: `<BackLink href='/questions' />`,
	},

	'filter-group': {
		title: 'Filter group',
		preview: <FilterDemo />,
		code: `const [sort, setSort] = useState<'recent' | 'popular'>('recent');

<FilterGroup
  label='Sort questions'
  options={[
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
  ]}
  value={sort}
  onChange={setSort}
/>`,
	},

	tag: {
		title: 'Tag',
		preview: (
			<Stack direction='row' gap='3' align='center' wrap>
				<Tag variant='course'>COS 226</Tag>
				<Tag>exam prep</Tag>
				<Tag variant='category'>Algorithms</Tag>
			</Stack>
		),
		code: `<Tag variant='course'>COS 226</Tag>
<Tag>exam prep</Tag>
<Tag variant='category'>Algorithms</Tag>`,
	},

	input: {
		title: 'Input',
		preview: (
			<Stack gap='4'>
				<Input
					label='Search Q&A'
					hideLabel
					type='search'
					variant='search'
					icon={Search}
					placeholder='Search Q&A'
				/>
				<Input
					label='Question Title'
					placeholder='e.g. How do I approach the graph algorithms in COS 226?'
				/>
				<Input label='Course (Optional)' placeholder='e.g. COS 226' />
				<Input label='Max Participants' defaultValue='1' error='Must be at least 2' />
				<Input label='Disabled' disabled defaultValue='Frist 302' />
			</Stack>
		),
		code: `<Input label='Search Q&A' hideLabel type='search' variant='search' icon={Search} placeholder='Search Q&A' />
<Input label='Question Title' placeholder='e.g. How do I…' />
<Input label='Course (Optional)' placeholder='e.g. COS 226' />
<Input label='Max Participants' error='Must be at least 2' />`,
	},

	textarea: {
		title: 'Textarea',
		preview: (
			<Stack gap='4'>
				<Textarea
					label='Details'
					rows={6}
					hint='Tip: Add specific details and context to get better answers'
					placeholder='Provide more details about your question…'
				/>
				<Textarea label='With error' error='Please add some details' />
			</Stack>
		),
		code: `<Textarea
  label='Details'
  rows={8}
  hint='Tip: Add specific details and context to get better answers'
  placeholder='Provide more details about your question…'
/>`,
	},

	select: {
		title: 'Select',
		preview: (
			<Select
				label='Category'
				placeholder='Select a category'
				options={[
					{ value: 'exam', label: 'Exam Prep' },
					{ value: 'psets', label: 'Assignments and PSETs' },
				]}
			/>
		),
		code: `<Select
  label='Category'
  placeholder='Select a category'
  options={[{ value: 'exam', label: 'Exam Prep' }]}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>`,
	},

	checkbox: {
		title: 'Checkbox',
		preview: (
			<Stack gap='2'>
				<Checkbox label='Post Anonymously' />
				<Checkbox label='Checked' defaultChecked />
				<Checkbox label='Disabled' disabled />
			</Stack>
		),
		code: `<Checkbox
  label='Post Anonymously'
  checked={anonymous}
  onChange={(e) => setAnonymous(e.target.checked)}
/>`,
	},

	tabs: {
		title: 'Tabs',
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

	avatar: {
		title: 'Avatar',
		preview: (
			<Stack direction='row' gap='4' align='center' wrap>
				<Avatar name='Annie O’Brien' size='sm' />
				<Avatar name='Shannon Huang' />
				<Avatar name='Alex Chen' size='lg' />
				<Avatar name='Alex Chen' size='xl' />
				<Avatar name='Anonymous' anonymous />
			</Stack>
		),
		code: `<Avatar name='Shannon Huang' />          // 40px, answers and comments
<Avatar name='Alex Chen' size='lg' />     // 80px, question author
<Avatar name='Alex Chen' size='xl' />     // 112px, profile
<Avatar name='Anonymous' anonymous />`,
	},

	byline: {
		title: 'Byline',
		preview: (
			<Stack gap='4'>
				<Byline name='Alex Chen' meta={['Q&A', '2h ago']} />
				<Byline name='Sam Patel' anonymous meta={['Q&A', '45m ago']} />
			</Stack>
		),
		code: `<Byline name='Alex Chen' meta={['Q&A', formatTimePassed(createdAt)]} />
<Byline name={name} anonymous meta={['Q&A', '45m ago']} />`,
	},

	'meta-row': {
		title: 'Meta row',
		preview: (
			<Stack gap='2'>
				<MetaRow items={['Sarah Park', '2h ago']} />
				<MetaRow
					size='lg'
					items={['7 posts in Q&A', 'Class of 2026', 'Computer Science']}
				/>
			</Stack>
		),
		code: `<MetaRow items={['Sarah Park', '2h ago']} />
<MetaRow size='lg' items={['7 posts in Q&A', 'Class of 2026', 'Computer Science']} />`,
	},

	stat: {
		title: 'Stat',
		preview: (
			<Stack direction='row' gap='4' align='center'>
				<Stat icon={Triangle} filled>
					12
				</Stat>
				<Stat icon={Eye}>45 views</Stat>
				<Stat icon={Triangle} filled>
					12 Upvotes
				</Stat>
			</Stack>
		),
		code: `import { Eye, Triangle } from 'lucide-react';

<Stat icon={Triangle} filled>12</Stat>
<Stat icon={Eye}>45 views</Stat>`,
	},

	'upvote-button': {
		title: 'Upvote button',
		preview: (
			<Stack direction='row' gap='6' align='center'>
				<UpvoteDemo initialUpvoted={false} />
				<UpvoteDemo initialUpvoted />
			</Stack>
		),
		code: `const upvote = useUpvote({ kind: 'answer', id: answer.id, initialCount: answer.hearts });

<UpvoteButton {...upvote} thing='answer' />`,
	},

	'thread-item': {
		title: 'Thread item',
		preview: (
			<ThreadItem
				name='Shannon Huang'
				meta='45m ago'
				actions={<UpvoteDemo initialUpvoted={false} />}
				replies={
					<ThreadItem
						name='Annie O’Brien'
						meta='20m ago'
						actions={<UpvoteDemo initialUpvoted={false} />}
					>
						<Text>Where on the course website can I find these?</Text>
					</ThreadItem>
				}
			>
				<Text>
					I would take a look at the practice exams from prior years published on the
					course website. The exams tend to be quite similar from year to year.
				</Text>
			</ThreadItem>
		),
		code: `<ThreadItem
  name={answer.user.name}
  anonymous={answer.isAnonymous}
  meta={formatTimePassed(answer.createdAt)}
  actions={<UpvoteButton {...upvote} thing='answer' />}
  replies={<CommentList comments={answer.comments} answerId={String(answer.id)} />}
>
  <ExpandableText text={answer.text} limit={2000} />
</ThreadItem>`,
	},

	'question-card': {
		title: 'Question card',
		preview: (
			<Stack gap='6'>
				<QuestionCard
					title='Best strategies for COS226 midterm prep?'
					preview='I have my midterm coming up in two weeks and I’m looking for effective study strategies. Has anyone found particular resources or practice problems that helped them the most?'
					meta={['Sarah Park', '2h ago']}
					course='COS 226'
					tags={['exam prep', 'study tips']}
					upvotes={12}
					views={45}
					answers={2}
					href='/design/components/question-card'
				/>
				<QuestionCard
					layout='profile'
					title='How to cite sources in ORF 245 final paper?'
					preview='The professor mentioned APA format but I’m not sure if that applies to the statistical appendix as well.'
					meta={['Q&A', '3d ago']}
					course='ORF 245'
					tags={['citation']}
					upvotes={5}
					views={31}
				/>
			</Stack>
		),
		code: `<QuestionCard
  title='Best strategies for COS226 midterm prep?'
  preview='I have my midterm coming up in two weeks…'
  meta={['Sarah Park', '2h ago']}
  course='COS 226'
  tags={['exam prep', 'study tips']}
  upvotes={12}
  views={45}
  answers={2}
  href='/questions/1'
/>

// preview, upvotes, views and answers are optional; leave one out to hide it.
// On a profile: meta above the title, no answer count
<QuestionCard layout='profile' meta={['Q&A', '3d ago']} … />`,
	},

	'study-group-card': {
		title: 'Study group card',
		preview: (
			<Stack direction='row' gap='4' wrap>
				<StudyGroupCardDemo />
				<StudyGroupCardDemo full />
			</Stack>
		),
		code: `<StudyGroupCard
  title='COS 226 Study Group'
  description='Deep dive into graph algorithms…'
  leader='Alex Chen'
  meetsAt={group.meeting_datetime}
  joined={12}
  spots={15}
  onJoin={() => join(group.id)}
/>`,
	},

	message: {
		title: 'Message',
		inFigma: false,
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

	spinner: {
		title: 'Spinner',
		inFigma: false,
		preview: (
			<Stack direction='row' gap='8' align='center'>
				<Spinner />
				<Spinner size='sm' label='Posting…' />
			</Stack>
		),
		code: `<Spinner label='Loading questions…' />
<Spinner size='sm' label='Posting…' />`,
	},

	'expandable-text': {
		title: 'Expandable text',
		inFigma: false,
		preview: (
			<ExpandableText
				limit={120}
				text='I would take a look at the practice exams from prior years published on the course website. The exams tend to be quite similar in terms of structure and content from year to year, so they are the best way to practice.'
			/>
		),
		code: `<ExpandableText text={answer.text} limit={2000} />
<ExpandableText text={comment.text} limit={200} />`,
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
<IconButton icon={Search} label='Search' variant='secondary' />`,
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

	'page-header': {
		title: 'Page header',
		preview: (
			<PageHeader
				title='Study Groups'
				description='Collaborate with peers on coursework and exam preparation'
				action={<Button>Create Study Group</Button>}
			/>
		),
		code: `<PageHeader
  title='Study Groups'
  description='Collaborate with peers on coursework and exam preparation'
  action={<Button asChild><Link href='/study-groups/form'>Create Study Group</Link></Button>}
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

	heading: {
		title: 'Heading',
		preview: (
			<Stack gap='3'>
				<Heading variant='h1'>Q&amp;A</Heading>
				<Heading variant='h2'>Best strategies for COS226 midterm prep?</Heading>
				<Heading variant='h3'>Alex Chen</Heading>
				<Heading variant='title'>2 Answers</Heading>
			</Stack>
		),
		code: `<Heading variant='h1'>Q&amp;A</Heading>
<Heading variant='h2' as='h1'>{question.title}</Heading>
<Heading variant='title' as='h2'>2 Answers</Heading>`,
	},

	text: {
		title: 'Text',
		preview: (
			<Stack gap='1'>
				<Text>Body</Text>
				<Text variant='body-sm' tone='muted'>
					Body small, muted
				</Text>
				<Text variant='label'>Label</Text>
				<Text variant='small'>Small</Text>
				<Text tone='brand'>Brand</Text>
				<Text tone='danger'>Danger</Text>
			</Stack>
		),
		code: `<Text>Body</Text>
<Text variant='body-sm' tone='muted'>2h ago</Text>
<Text variant='label'>Question Title</Text>
<Text variant='small'>exam prep</Text>`,
	},
};
