import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const HeartSchema = z.object({
	// Define the schema based on the backend model
	user: z.number(),
	question: z.number().nullable(),
	answer: z.number().nullable(),
	comment: z.number().nullable(),
});

type Heart = z.infer<typeof HeartSchema>;

// Hearts a question on behalf of the authenticated user.
// POST /heart/questions/{questionId}
export async function heartQuestion(questionId: string): Promise<Heart | null> {
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
		return HeartSchema.parse(data);
	} catch (error) {
		console.error('Error hearting question:', error);
		return null;
	}
}

// Hearts a question on behalf of the authenticated user.
// POST /heart/questions/{questionId}
export async function heartAnswer(answerId: string): Promise<Heart | null> {
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
		return HeartSchema.parse(data);
	} catch (error) {
		console.error('Error hearting answer:', error);
		return null;
	}
}

// Hearts a comment on behalf of the authenticated user.
// POST /heart/comments/{commentId}
export async function heartComment(commentId: string): Promise<Heart | null> {
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
		return HeartSchema.parse(data);
	} catch (error) {
		console.error('Error hearting comment:', error);
		return null;
	}
}
