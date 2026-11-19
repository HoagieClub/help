import type { ReactNode } from 'react';

import { Eye, Triangle } from 'lucide-react';
import Link from 'next/link';

import { Heading, MetaRow, Stat, Tag, Text, cardVariants } from '@/components/ui';
import { cn } from '@/lib/utils';

export type QuestionCardProps = {
	title: string;
	/** Start of the body; clamped to two lines. Leave out to hide it. */
	preview?: string;
	/** Facts shown with the title, e.g. ['Sarah Park', '2h ago'] or ['Q&A', '2h ago']. */
	meta: string[];
	/** Course code, shown as a red tag, e.g. "COS 226". */
	course?: string | null;
	/** Topic tags, shown as gray tags. */
	tags?: string[];
	/** Leave out to hide it. */
	upvotes?: number;
	views?: number;
	/** Number of answers, shown top right. Leave out to hide it. */
	answers?: number;
	/**
	 * `feed` (Q&A page): title, then meta, answer count top right.
	 * `profile` (user page): meta above the title, no answer count.
	 */
	layout?: 'feed' | 'profile';
	/** When set, the whole card links here (clicking anywhere except `actions` opens it). */
	href?: string;
	/**
	 * Clickable things in the bottom row, e.g. HeartButton, ViewCount and ReplyButton. Leave out for
	 * a read-only card (Q&A feed, user page). They go after `upvotes` and `views`, so when you pass
	 * actions, leave those two out and put the whole row here in the order you want.
	 */
	actions?: ReactNode;
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
 *
 * // With buttons (For You page): pass the whole bottom row, and leave out upvotes and views
 * <QuestionCard
 *   … href='/questions/1'
 *   actions={
 *     <>
 *       <HeartButton {...heart} thing='question' />
 *       <ViewCount count={question.view} />
 *       <ReplyButton onClick={openReply} thing='question' />
 *     </>
 *   }
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
	actions,
}: QuestionCardProps) {
	const metaRow = <MetaRow items={meta} />;

	const content = (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-col gap-1'>
				{layout === 'profile' && metaRow}
				<div className='flex items-start justify-between gap-4'>
					<Heading variant='title'>
						{href ? (
							// The link stretches over the whole card (after:inset-0), so the card
							// stays clickable while the buttons in `actions` sit above it.
							<Link
								href={href}
								className='outline-none after:absolute after:inset-0 after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus'
							>
								{title}
							</Link>
						) : (
							title
						)}
					</Heading>
					{layout === 'feed' && answers !== undefined && (
						<span className='shrink-0 font-body text-small text-muted'>
							{answersLabel(answers)}
						</span>
					)}
				</div>
				{layout === 'feed' && metaRow}
			</div>
			{preview && (
				<div className='line-clamp-2'>
					<Text variant='small' tone='muted'>
						{preview}
					</Text>
				</div>
			)}
			{(course || tags.length > 0) && (
				<div className='flex flex-wrap gap-2'>
					{course && <Tag variant='course'>{course}</Tag>}
					{tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</div>
			)}
			{(upvotes !== undefined || views !== undefined || actions) && (
				<div className='flex items-center gap-4'>
					{upvotes !== undefined && (
						<Stat icon={Triangle} filled>
							{upvotes}
							<span className='sr-only'> upvotes</span>
						</Stat>
					)}
					{views !== undefined && (
						<Stat icon={Eye}>
							{views} {views === 1 ? 'view' : 'views'}
						</Stat>
					)}
					{actions && (
						<div className='relative z-10 flex items-center gap-4'>{actions}</div>
					)}
				</div>
			)}
		</div>
	);

	return (
		<article className={cn(cardVariants({ interactive: Boolean(href) }), 'relative')}>
			{content}
		</article>
	);
}
