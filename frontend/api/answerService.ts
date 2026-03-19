import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';
import { getAllComments } from './commentService';
import type { Answer } from '@/types';

const ANSWERS_DETAIL_URL = `${process.env.BACKEND}/answers/`;
const ANSWERS_LIST_URL = `${process.env.BACKEND}/questions/`;

const AnswerApiSchema = z.object({
	id: z.number(),
	question: z.number(),
	user: z.union([
		z.number(),
		z.object({ name: z.string().optional(), email: z.string().optional() }),
	]),
	text: z.string(),
	hearts: z.number().int().nonnegative(),
	is_anonymous: z.boolean(),
	created_at: z.string(),
	updated_at: z.string(),
});

function toFrontendAnswer(
	apiAnswer: z.infer<typeof AnswerApiSchema>,
	comments: Answer['comments']
): Answer {
	const user =
		typeof apiAnswer.user === 'number'
			? { name: `User ${apiAnswer.user}` }
			: { name: apiAnswer.user.name, email: apiAnswer.user.email };

	return {
		id: apiAnswer.id,
		question: apiAnswer.question,
		user,
		text: apiAnswer.text,
		hearts: apiAnswer.hearts,
		isAnonymous: apiAnswer.is_anonymous,
		createdAt: apiAnswer.created_at,
		updatedAt: apiAnswer.updated_at,
		comments,
	};
}

function toFrontendComment(apiComment: {
	id: number;
	answer: number;
	user: number;
	text: string;
	hearts: number;
	is_anonymous: boolean;
	created_at: string;
	updated_at: string;
}): Answer['comments'][number] {
	return {
		id: apiComment.id,
		answer: apiComment.answer,
		user: { name: `User ${apiComment.user}` },
		text: apiComment.text,
		hearts: apiComment.hearts,
		isAnonymous: apiComment.is_anonymous,
		createdAt: apiComment.created_at,
		updatedAt: apiComment.updated_at,
	};
}

export async function getAnswersByQuestionId(questionId: string): Promise<Answer[] | null> {
	try {
		const response = await fetch(
			buildAnswerListUrl(questionId),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch answers for question ${questionId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = z.array(AnswerApiSchema).safeParse(data);

		if (!parsed.success) {
			console.error('Failed to parse answers:', parsed.error.issues);
			return null;
		}

		const answersWithComments = await Promise.all(
			parsed.data.map(async (apiAnswer) => {
				const commentsData = await getAllComments(apiAnswer.id.toString());
				const comments = (commentsData ?? []).map(toFrontendComment);
				return toFrontendAnswer(apiAnswer, comments);
			})
		);

		return answersWithComments;
	} catch (error) {
		console.error(`Error fetching answers for question ${questionId}:`, error);
		return null;
	}
}

export async function getAllAnswers(questionId: string): Promise<Answer[] | null> {
	return getAnswersByQuestionId(questionId);
}

export async function createNewAnswer(): Promise<Answer | null> {
	// POST /questions/{questionId}/answers/
	return null;
}

export async function getAnswerDetails(answerId: string): Promise<Answer | null> {
	// GET /answers/{answerId}
	return null;
}

export async function updateAnswerDetails(answerId: string): Promise<Answer | null> {
	// PUT /answers/{answerId}
	return null;
}

export async function deleteAnswer(answerId: string): Promise<Answer | null> {
	// DELETE /answers/{answerId}
	return null;
}

function buildAnswerListUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId.toString());
	return `${ANSWERS_LIST_URL}${encodedQuestionId}/answers/`;
}

function buildAnswerDetailUrl(answerId: string): string {
	const encodedAnswerId = encodeURIComponent(answerId.toString());
	return `${ANSWERS_DETAIL_URL}${encodedAnswerId}/`;
}
