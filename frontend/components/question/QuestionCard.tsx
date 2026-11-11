import { Eye, Triangle } from 'lucide-react';
import Link from 'next/link';

import { Heading, MetaRow, Stat, Tag, Text, cardVariants } from '@/components/ui';
import { cn } from '@/lib/utils';

export type QuestionCardProps = {
	title: string;
	/** Start of the body; clamped to two lines. */
	preview: string;
	/** Facts shown with the title, e.g. ['Sarah Park', '2h ago'] or ['Q&A', '2h ago']. */
	meta: string[];
	/** Course code, shown as a red tag, e.g. "COS 226". */
	course?: string | null;
	/** Topic tags, shown as gray tags. */
	tags?: string[];
	upvotes: number;
	views?: number;
	/** Number of answers, shown top right. Leave out to hide it. */
	answers?: number;
	/**
	 * `feed` (Q&A page): title, then meta, answer count top right.
	 * `profile` (user page): meta above the title, no answer count.
	 */
	layout?: 'feed' | 'profile';
	/** When set, the whole card links here. */
	href?: string;
};

function answersLabel(answers: number) {
	if (answers === 0) {
		return 'No answers yet';
	}
	return `${answers} ${answers === 1 ? 'answer' : 'answers'}`;
}

/**
 * A question in a list: the Q&A feed, search results, a profile.
 *
 * @example
 * <QuestionCard
 *   title='Best strategies for COS226 midterm prep?'
 *   preview='I have my midterm coming up in two weeks…'
 *   meta={['Sarah Park', '2h ago']}
 *   course='COS 226'
 *   tags={['exam prep', 'study tips']}
 *   upvotes={12}
 *   views={45}
 *   answers={2}
 *   href='/questions/1'
 * />
 */
export function QuestionCard({
	title,
	preview,
	meta,
	course,
	tags = [],
	upvotes,
	views,
	answers,
	layout = 'feed',
	href,
}: QuestionCardProps) {
	const metaRow = <MetaRow items={meta} tone={layout === 'profile' ? 'default' : 'muted'} />;

	const content = (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col gap-1'>
				{layout === 'profile' && metaRow}
				<div className='flex items-start justify-between gap-4'>
					<Heading variant='title'>{title}</Heading>
					{layout === 'feed' && answers !== undefined && (
						<span className='shrink-0 font-body text-body-sm text-muted'>
							{answersLabel(answers)}
						</span>
					)}
				</div>
				{layout === 'feed' && metaRow}
			</div>
			<div className='line-clamp-2'>
				<Text variant='small'>{preview}</Text>
			</div>
			{(course || tags.length > 0) && (
				<div className='flex flex-wrap gap-2'>
					{course && <Tag variant='course'>{course}</Tag>}
					{tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
			)}
			<div className='flex items-center gap-4'>
				<Stat icon={Triangle} filled>
					{upvotes}
					<span className='sr-only'> upvotes</span>
				</Stat>
				{views !== undefined && <Stat icon={Eye}>{views} views</Stat>}
			</div>
		</div>
	);

	if (href) {
		return (
			<Link
				href={href}
				className={cn(
					cardVariants({ interactive: true }),
					'block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'
				)}
			>
				{content}
			</Link>
		);
	}
	return <article className={cn(cardVariants())}>{content}</article>;
}
