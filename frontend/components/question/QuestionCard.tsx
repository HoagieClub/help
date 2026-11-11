import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Tag } from '@/components/ui';

export type QuestionCardProps = {
	/** Course code, shown as a tag, e.g. "COS 226". */
	course: string;
	/** Who asked and when, e.g. "Asked by Ava · 2h ago". */
	meta: string;
	title: string;
	/** Start of the question body; clamped to two lines. */
	preview: string;
	hearts: number;
	answers: number;
	/** Whether the viewer has hearted this question. */
	liked: boolean;
	/** When set, the whole card links here. */
	href?: string;
};

const cardClasses = [
	'flex flex-col gap-2 rounded-md border border-line-neutral bg-surface p-4',
	'transition-shadow hover:shadow-card-hover',
];

/**
 * The feed card for one question. Put it on a bg-surface-gray page.
 *
 * @example
 * <QuestionCard
 *   course='COS 226'
 *   meta='Asked by Ava · 2h ago'
 *   title='How do I handle the two-children case in BST delete?'
 *   preview='I get insertion, but deletion breaks when the node has two children…'
 *   hearts={12}
 *   answers={3}
 *   liked={false}
 *   href='/questions/1'
 * />
 */
export function QuestionCard({
	course,
	meta,
	title,
	preview,
	hearts,
	answers,
	liked,
	href,
}: QuestionCardProps) {
	const content = (
		<>
			<div className='flex items-center gap-2'>
				<Tag variant='selected'>{course}</Tag>
				<span className='font-body text-small text-muted'>{meta}</span>
			</div>
			<h3 className='m-0 font-heading text-h3 text-ink'>{title}</h3>
			<p className='m-0 line-clamp-2 font-body text-body text-ink'>{preview}</p>
			<div className='flex items-center gap-4 font-body text-small'>
				<span className={liked ? 'font-semibold text-brand' : 'text-muted'}>
					<span aria-hidden='true'>{liked ? '♥' : '♡'}</span> {hearts}
					<span className='sr-only'>
						{liked ? ' hearts, including yours' : ' hearts'}
					</span>
				</span>
				<span className='text-muted'>
					{answers} {answers === 1 ? 'answer' : 'answers'}
				</span>
			</div>
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				className={cn(
					cardClasses,
					'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'
				)}
			>
				{content}
			</Link>
		);
	}
	return <article className={cn(cardClasses)}>{content}</article>;
}
