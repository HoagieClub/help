/**
 * @overview Dashboard component that displays all posts a user has made in the
 * Q&A sections. Shows a profile header, tab navigation (Questions / Answers /
 * Comments), and a scrollable feed of post cards.
 *
 * Modelled after a Reddit-style profile page but styled to match the Help app
 * visual identity (teal brand, Inter font, card system from globals.css).
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import React, { useState, useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UserPostQuestion {
	id: number;
	title: string;
	details: string;
	tags: string[];
	course: string | null;
	hearts: number;
	views: number;
	createdAt: string;
}

export interface UserPostAnswer {
	id: number;
	questionId: number;
	questionTitle: string;
	text: string;
	hearts: number;
	createdAt: string;
}

export interface UserPostComment {
	id: number;
	answerId: number;
	questionTitle: string;
	text: string;
	hearts: number;
	createdAt: string;
}

export interface UserPostsUser {
	name: string;
	email?: string;
	avatarUrl?: string;
	classYear?: number;
}

export interface UserPostsDashboardProps {
	user: UserPostsUser;
	questions: UserPostQuestion[];
	answers: UserPostAnswer[];
	comments: UserPostComment[];
	onQuestionClick?: (questionId: number) => void;
	onAnswerClick?: (questionId: number) => void;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type Tab = 'questions' | 'answers' | 'comments';

const TAB_LABELS: Record<Tab, string> = {
	questions: 'Questions',
	answers: 'Answers',
	comments: 'Comments',
};

function timeAgo(dateString: string): string {
	const now = new Date();
	const date = new Date(dateString);
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (seconds < 60) return 'just now';

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;

	const days = Math.floor(hours / 24);
	if (days < 30) return `${days}d ago`;

	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo ago`;

	const years = Math.floor(months / 12);
	return `${years}y ago`;
}

function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Inline icons (match Post.tsx pattern)                              */
/* ------------------------------------------------------------------ */

const HeartIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='h-4 w-4'
	>
		<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
	</svg>
);

const MessageCircleIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='h-4 w-4'
	>
		<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
	</svg>
);

const EyeIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className='h-4 w-4'
	>
		<path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
		<circle cx='12' cy='12' r='3' />
	</svg>
);

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function UserAvatar({ user }: { user: UserPostsUser }) {
	if (user.avatarUrl) {
		return (
			<div
				className='h-20 w-20 shrink-0 rounded-full border-4 border-white bg-gray-200 bg-cover bg-center shadow-sm'
				style={{ backgroundImage: `url(${user.avatarUrl})` }}
			/>
		);
	}

	return (
		<div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#1EA7AE] text-2xl font-bold text-white shadow-sm'>
			{getInitials(user.name)}
		</div>
	);
}

function QuestionCard({
	question,
	onClick,
}: {
	question: UserPostQuestion;
	onClick?: () => void;
}) {
	return (
		<div
			className='cursor-pointer rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md'
			onClick={onClick}
		>
			<div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
				<span>Q&A</span>
				<span>•</span>
				<span>{timeAgo(question.createdAt)}</span>
			</div>

			<h3 className='mb-2 text-base font-semibold text-foreground'>{question.title}</h3>

			{question.details && (
				<p className='mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground'>
					{question.details}
				</p>
			)}

			<div className='mb-3 flex flex-wrap gap-2'>
				{question.course && (
					<span className='inline-flex items-center rounded-full bg-[#1EA7AE]/10 px-2.5 py-0.5 text-xs font-medium text-[#1EA7AE]'>
						{question.course}
					</span>
				)}
				{question.tags.map((tag, i) => (
					<span
						key={i}
						className='inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground'
					>
						{tag}
					</span>
				))}
			</div>

			<div className='flex items-center gap-4 text-xs text-muted-foreground'>
				<span className='flex items-center gap-1.5'>
					<HeartIcon />
					{question.hearts}
				</span>
				<span className='flex items-center gap-1.5'>
					<EyeIcon />
					{question.views} {question.views === 1 ? 'view' : 'views'}
				</span>
			</div>
		</div>
	);
}

function AnswerCard({
	answer,
	onClick,
}: {
	answer: UserPostAnswer;
	onClick?: () => void;
}) {
	return (
		<div
			className='cursor-pointer rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md'
			onClick={onClick}
		>
			<div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
				<span className='flex items-center gap-1'>
					<MessageCircleIcon />
					Answered
				</span>
				<span>•</span>
				<span>{timeAgo(answer.createdAt)}</span>
			</div>

			<p className='mb-2 text-xs text-muted-foreground'>
				Re:{' '}
				<span className='font-medium text-foreground'>{answer.questionTitle}</span>
			</p>

			<p className='mb-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
				{answer.text}
			</p>

			<div className='flex items-center gap-4 text-xs text-muted-foreground'>
				<span className='flex items-center gap-1.5'>
					<HeartIcon />
					{answer.hearts}
				</span>
			</div>
		</div>
	);
}

function CommentCard({
	comment,
	onClick,
}: {
	comment: UserPostComment;
	onClick?: () => void;
}) {
	return (
		<div
			className='cursor-pointer rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md'
			onClick={onClick}
		>
			<div className='mb-1 flex items-center gap-2 text-xs text-muted-foreground'>
				<span className='flex items-center gap-1'>
					<MessageCircleIcon />
					Commented
				</span>
				<span>•</span>
				<span>{timeAgo(comment.createdAt)}</span>
			</div>

			<p className='mb-2 text-xs text-muted-foreground'>
				Re:{' '}
				<span className='font-medium text-foreground'>{comment.questionTitle}</span>
			</p>

			<p className='mb-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
				{comment.text}
			</p>

			<div className='flex items-center gap-4 text-xs text-muted-foreground'>
				<span className='flex items-center gap-1.5'>
					<HeartIcon />
					{comment.hearts}
				</span>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function UserPostsDashboard({
	user,
	questions,
	answers,
	comments,
	onQuestionClick,
	onAnswerClick,
}: UserPostsDashboardProps) {
	const [activeTab, setActiveTab] = useState<Tab>('questions');

	const counts: Record<Tab, number> = useMemo(
		() => ({
			questions: questions.length,
			answers: answers.length,
			comments: comments.length,
		}),
		[questions, answers, comments],
	);

	const totalPosts = counts.questions + counts.answers + counts.comments;

	return (
		<div className='mx-auto w-full max-w-3xl px-4 py-8'>
			{/* ---- Profile header ---- */}
			<div className='mb-8 flex items-center gap-5'>
				<UserAvatar user={user} />
				<div>
					<h1 className='text-2xl font-bold text-foreground'>{user.name}</h1>
					{user.email && (
						<p className='mt-0.5 text-sm text-muted-foreground'>{user.email}</p>
					)}
					<p className='mt-1 text-xs text-muted-foreground'>
						{totalPosts} {totalPosts === 1 ? 'post' : 'posts'} in Q&A
						{user.classYear ? ` · Class of ${user.classYear}` : ''}
					</p>
				</div>
			</div>

			{/* ---- Tab navigation ---- */}
			<div className='mb-6 flex gap-1 border-b border-border'>
				{(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
					<button
						key={tab}
						type='button'
						onClick={() => setActiveTab(tab)}
						className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
							activeTab === tab
								? 'text-[#1EA7AE]'
								: 'text-muted-foreground hover:text-foreground'
						}`}
					>
						{TAB_LABELS[tab]}
						<span className='ml-1.5 text-xs text-muted-foreground'>
							{counts[tab]}
						</span>

						{/* Active indicator */}
						{activeTab === tab && (
							<span className='absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#1EA7AE]' />
						)}
					</button>
				))}
			</div>

			{/* ---- Feed ---- */}
			<div className='flex flex-col gap-4'>
				{activeTab === 'questions' &&
					(questions.length > 0 ? (
						questions.map((q) => (
							<QuestionCard
								key={q.id}
								question={q}
								onClick={() => onQuestionClick?.(q.id)}
							/>
						))
					) : (
						<EmptyState label='questions' />
					))}

				{activeTab === 'answers' &&
					(answers.length > 0 ? (
						answers.map((a) => (
							<AnswerCard
								key={a.id}
								answer={a}
								onClick={() => onAnswerClick?.(a.questionId)}
							/>
						))
					) : (
						<EmptyState label='answers' />
					))}

				{activeTab === 'comments' &&
					(comments.length > 0 ? (
						comments.map((c) => (
							<CommentCard key={c.id} comment={c} />
						))
					) : (
						<EmptyState label='comments' />
					))}
			</div>
		</div>
	);
}

function EmptyState({ label }: { label: string }) {
	return (
		<div className='flex flex-col items-center justify-center py-16 text-center'>
			<div className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary'>
				<MessageCircleIcon />
			</div>
			<p className='text-sm font-medium text-foreground'>No {label} yet</p>
			<p className='mt-1 text-xs text-muted-foreground'>
				Posts you make in Q&A will show up here.
			</p>
		</div>
	);
}

export default UserPostsDashboard;
