import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

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
		const response = await fetch(
			`questions/${encodeURIComponent(questionId)}/heart`,
			buildRequest(HttpRequestType.POST)
		);
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
		const response = await fetch(
			`answers/${encodeURIComponent(answerId)}/heart`,
			buildRequest(HttpRequestType.POST)
		);
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
		const response = await fetch(
			`comments/${encodeURIComponent(commentId)}/heart`,
			buildRequest(HttpRequestType.POST)
		);
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
