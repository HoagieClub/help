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

import {
	Avatar,
	Card,
	ChatIcon,
	EyeOpenIcon,
	Heading,
	HeartIcon,
	majorScale,
	Pane,
	Tab,
	TabNavigation,
	Text,
} from 'evergreen-ui';

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

type TabKey = 'questions' | 'answers' | 'comments';

const TAB_LABELS: Record<TabKey, string> = {
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const BRAND_COLOR = '#1EA7AE';

function UserAvatar({ user }: { user: UserPostsUser }) {

	return (
		<Avatar
			name={user.name}
			src={user.avatarUrl}
			size={80}
			backgroundColor={BRAND_COLOR}
			color='white'
		/>
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
		<Card
			elevation={0}
			border='default'
			borderRadius={8}
			padding={majorScale(3)}
			cursor='pointer'
			onClick={onClick}
		>
			<Pane display='flex' alignItems='center' gap={majorScale(1)} marginBottom={majorScale(1)}>
				<Text size={300} color='muted'>
					Q&A • {timeAgo(question.createdAt)}
				</Text>
			</Pane>

			<Heading size={500} marginBottom={majorScale(2)}>
				{question.title}
			</Heading>

			{question.details && (
				<Text size={400} color='muted' marginBottom={majorScale(3)}>
					{question.details}
				</Text>
			)}

			<Pane display='flex' flexWrap='wrap' gap={majorScale(1)} marginBottom={majorScale(3)}>
				{question.course && (
					<Pane
						display='inline-flex'
						alignItems='center'
						paddingX={majorScale(2)}
						paddingY={majorScale(1)}
						borderRadius={9999}
						backgroundColor={`${BRAND_COLOR}1A`}
					>
						<Text size={300} color={BRAND_COLOR}>
							{question.course}
						</Text>
					</Pane>
				)}
				{question.tags.map((tag, i) => (
					<Pane
						key={i}
						display='inline-flex'
						alignItems='center'
						paddingX={majorScale(2)}
						paddingY={majorScale(1)}
						borderRadius={9999}
						border='default'
						backgroundColor='gray50'
					>
						<Text size={300} color='muted'>
							{tag}
						</Text>
					</Pane>
				))}
			</Pane>

			<Pane display='flex' alignItems='center' gap={majorScale(4)}>
				<Pane display='flex' alignItems='center' gap={majorScale(1)}>
					<HeartIcon size={14} color='muted' />
					<Text size={300} color='muted'>
						{question.hearts}
					</Text>
				</Pane>
				<Pane display='flex' alignItems='center' gap={majorScale(1)}>
					<EyeOpenIcon size={14} color='muted' />
					<Text size={300} color='muted'>
						{question.views} {question.views === 1 ? 'view' : 'views'}
					</Text>
				</Pane>
			</Pane>
		</Card>
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
		<Card
			elevation={0}
			border='default'
			borderRadius={8}
			padding={majorScale(3)}
			cursor='pointer'
			onClick={onClick}
		>
			<Pane display='flex' alignItems='center' gap={majorScale(1)} marginBottom={majorScale(1)}>
				<ChatIcon size={14} color='muted' />
				<Text size={300} color='muted'>
					Answered • {timeAgo(answer.createdAt)}
				</Text>
			</Pane>

			<Pane marginBottom={majorScale(2)} display='flex' flexWrap='wrap' alignItems='baseline'>
				<Text size={300} color='muted'>
					Re:{' '}
				</Text>
				<Text size={300} fontWeight={500}>
					{answer.questionTitle}
				</Text>
			</Pane>

			<Text size={400} color='muted' marginBottom={majorScale(3)}>
				{answer.text}
			</Text>

			<Pane display='flex' alignItems='center' gap={majorScale(1)}>
				<HeartIcon size={14} color='muted' />
				<Text size={300} color='muted'>
					{answer.hearts}
				</Text>
			</Pane>
		</Card>
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
		<Card
			elevation={0}
			border='default'
			borderRadius={8}
			padding={majorScale(3)}
			cursor='pointer'
			onClick={onClick}
		>
			<Pane display='flex' alignItems='center' gap={majorScale(1)} marginBottom={majorScale(1)}>
				<ChatIcon size={14} color='muted' />
				<Text size={300} color='muted'>
					Commented • {timeAgo(comment.createdAt)}
				</Text>
			</Pane>

			<Pane marginBottom={majorScale(2)} display='flex' flexWrap='wrap' alignItems='baseline'>
				<Text size={300} color='muted'>
					Re:{' '}
				</Text>
				<Text size={300} fontWeight={500}>
					{comment.questionTitle}
				</Text>
			</Pane>

			<Text size={400} color='muted' marginBottom={majorScale(3)}>
				{comment.text}
			</Text>

			<Pane display='flex' alignItems='center' gap={majorScale(1)}>
				<HeartIcon size={14} color='muted' />
				<Text size={300} color='muted'>
					{comment.hearts}
				</Text>
			</Pane>
		</Card>
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
	const [activeTab, setActiveTab] = useState<TabKey>('questions');

	const counts: Record<TabKey, number> = useMemo(
		() => ({
			questions: questions.length,
			answers: answers.length,
			comments: comments.length,
		}),
		[questions, answers, comments],
	);

	const totalPosts = counts.questions + counts.answers + counts.comments;

	return (
		<Pane maxWidth={majorScale(60)} marginX='auto' paddingX={majorScale(4)} paddingY={majorScale(6)}>
			{/* ---- Profile header ---- */}
			<Pane display='flex' alignItems='center' gap={majorScale(5)} marginBottom={majorScale(6)}>
				<UserAvatar user={user} />
				<Pane>
					<Heading size={700}>{user.name}</Heading>
					{user.email && (
						<Text size={400} color='muted' marginTop={2}>
							{user.email}
						</Text>
					)}
					<Text size={300} color='muted' marginTop={4}>
						{totalPosts} {totalPosts === 1 ? 'post' : 'posts'} in Q&A
						{user.classYear ? ` · Class of ${user.classYear}` : ''}
					</Text>
				</Pane>
			</Pane>

			{/* ---- Tab navigation ---- */}
			<TabNavigation marginBottom={majorScale(4)}>
				{(Object.keys(TAB_LABELS) as TabKey[]).map((tab) => (
					<Tab
						key={tab}
						id={tab}
						isSelected={activeTab === tab}
						appearance='primary'
						onSelect={() => setActiveTab(tab)}
						fontSize={14}
					>
						{TAB_LABELS[tab]} ({counts[tab]})
					</Tab>
				))}
			</TabNavigation>

			{/* ---- Feed ---- */}
			<Pane display='flex' flexDirection='column' gap={majorScale(4)}>
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
			</Pane>
		</Pane>
	);
}

function EmptyState({ label }: { label: string }) {
	return (
		<Pane
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			paddingY={majorScale(8)}
			textAlign='center'
		>
			<Pane
				marginBottom={majorScale(3)}
				display='flex'
				alignItems='center'
				justifyContent='center'
				width={majorScale(6)}
				height={majorScale(6)}
				borderRadius={9999}
				backgroundColor='gray100'
			>
				<ChatIcon size={24} color='muted' />
			</Pane>
			<Text size={400} fontWeight={500}>
				No {label} yet
			</Text>
			<Text size={300} color='muted' marginTop={4}>
				Posts you make in Q&A will show up here.
			</Text>
		</Pane>
	);
}

export default UserPostsDashboard;
