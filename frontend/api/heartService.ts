import { z } from 'zod';

import { api } from './common';

const QUESTION_HEART_URL = `/api/hoagie/questions/`;
const ANSWER_HEART_URL = `/api/hoagie/answers/`;
const COMMENT_HEART_URL = `/api/hoagie/comments/`;

// Matches the backend response: {"hearts": <updated_count>, "is_hearted": <bool>}
const HeartResponseSchema = z.object({
	hearts: z.number(),
	is_hearted: z.boolean(),
});

type HeartResponse = z.infer<typeof HeartResponseSchema>;

// Hearts/unhearts a question on behalf of the authenticated user.
// POST /questions/{questionId}/heart
export async function heartQuestion(questionId: string): Promise<HeartResponse | null> {
	try {
		const response = await fetch(buildQuestionHeartUrl(questionId), api.post());
		if (!response.ok) {
			console.error('Failed to heart question:', response.status, response.statusText);
			return null;
		}
		const data = await response.json();
		return HeartResponseSchema.parse(data);
	} catch (error) {
		console.error('Error hearting question:', error);
		return null;
	}
}

// Hearts/unhearts an answer on behalf of the authenticated user.
// POST /answers/{answerId}/heart
export async function heartAnswer(answerId: string): Promise<HeartResponse | null> {
	try {
		const response = await fetch(buildAnswerHeartUrl(answerId), api.post());
		if (!response.ok) {
			console.error('Failed to heart answer:', response.status, response.statusText);
			return null;
		}
		const data = await response.json();
		return HeartResponseSchema.parse(data);
	} catch (error) {
		console.error('Error hearting answer:', error);
		return null;
	}
}

// Hearts/unhearts a comment on behalf of the authenticated user.
// POST /comments/{commentId}/heart
export async function heartComment(commentId: string): Promise<HeartResponse | null> {
	try {
		const response = await fetch(buildCommentHeartUrl(commentId), api.post());
		if (!response.ok) {
			console.error('Failed to heart comment:', response.status, response.statusText);
			return null;
		}
		const data = await response.json();
		return HeartResponseSchema.parse(data);
	} catch (error) {
		console.error('Error hearting comment:', error);
		return null;
	}
}

function buildQuestionHeartUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId);
	return `${QUESTION_HEART_URL}${encodedQuestionId}/heart`;
}

function buildAnswerHeartUrl(answerId: string): string {
	const encodedAnswerId = encodeURIComponent(answerId);
	return `${ANSWER_HEART_URL}${encodedAnswerId}/heart`;
}

function buildCommentHeartUrl(commentId: string): string {
	const encodedCommentId = encodeURIComponent(commentId);
	return `${COMMENT_HEART_URL}${encodedCommentId}/heart`;
}
