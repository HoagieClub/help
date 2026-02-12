/**
 * @overview My Posts page — displays all Q&A activity for the current user.
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

import { useRouter } from 'next/navigation';

import {
	UserPostsDashboard,
	type UserPostQuestion,
	type UserPostAnswer,
	type UserPostComment,
	type UserPostsUser,
} from '@/components/UserPostsDashboard';

/* ------------------------------------------------------------------ */
/*  Sample data for preview                                            */
/* ------------------------------------------------------------------ */

const sampleUser: UserPostsUser = {
	name: 'Alex Chen',
	email: 'achen@princeton.edu',
	classYear: 2026,
};

const sampleQuestions: UserPostQuestion[] = [
	{
		id: 1,
		title: 'Best strategies for COS 226 midterm prep?',
		details:
			'I have my midterm coming up in two weeks and I\'m looking for effective study strategies. Has anyone found particular resources or practice problems that helped them the most?',
		tags: ['exam prep', 'study tips'],
		course: 'COS 226',
		hearts: 12,
		views: 89,
		createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
	},
	{
		id: 2,
		title: 'How to cite sources in ORF 245 final paper?',
		details:
			'The professor mentioned APA format but I\'m not sure if that applies to the statistical appendix as well. Any guidance from people who took this last semester?',
		tags: ['citation'],
		course: 'ORF 245',
		hearts: 5,
		views: 34,
		createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3d ago
	},
	{
		id: 3,
		title: 'Should I take COS 340 or MAT 375?',
		details:
			'Both cover similar topics but I\'ve heard very different things about workload and teaching style. Would love to hear from anyone who\'s taken either.',
		tags: ['course selection', 'course advice'],
		course: null,
		hearts: 8,
		views: 112,
		createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1w ago
	},
];

const sampleAnswers: UserPostAnswer[] = [
	{
		id: 1,
		questionId: 10,
		questionTitle: 'Tips for getting started with research as a sophomore?',
		text: 'I started by emailing professors whose work I found interesting after reading a couple of their papers. Most are very receptive to undergrads — just be specific about why their research excites you.',
		hearts: 7,
		createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1d ago
	},
	{
		id: 2,
		questionId: 15,
		questionTitle: 'What\'s the best way to study for orgo?',
		text: 'Practice problems are everything. I worked through every problem in the Klein textbook and that alone got me through the class. The mechanism drills on Organic Chemistry Tutor (YouTube) are also great.',
		hearts: 15,
		createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5d ago
	},
];

const sampleComments: UserPostComment[] = [
	{
		id: 1,
		answerId: 20,
		questionTitle: 'Is it worth doing a certificate in finance as a BSE student?',
		text: 'Totally agree with this — I did the same and it opened a lot of doors for internship applications.',
		hearts: 3,
		createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h ago
	},
	{
		id: 2,
		answerId: 25,
		questionTitle: 'How to balance extracurriculars and coursework?',
		text: 'The time-blocking strategy mentioned here really works. I\'d also add that saying no to things is an underrated skill.',
		hearts: 6,
		createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2d ago
	},
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function MyPostsPage() {
	const router = useRouter();

	return (
		<UserPostsDashboard
			user={sampleUser}
			questions={sampleQuestions}
			answers={sampleAnswers}
			comments={sampleComments}
			onQuestionClick={(id) => router.push(`/questions/${id}`)}
			onAnswerClick={(questionId) => router.push(`/questions/${questionId}`)}
		/>
	);
}
