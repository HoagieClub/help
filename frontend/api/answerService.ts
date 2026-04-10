import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const ANSWER_LIST_URL = `/api/hoagie/questions/`;
const ANSWER_DETAIL_URL = `/api/hoagie/answers/`;

const AnswerSchema = z.object({
	id: z.number().int(),
	question: z.number().int(), // id of question
	user: z.number().int(), // id of user
	text: z.string(),
	hearts: z.number().int().nonnegative(),
	is_anonymous: z.boolean(),
	created_at: z.string(),
	updated_at: z.string(),
});

type Answer = z.infer<typeof AnswerSchema>;
type AnswerWritableFields = Pick<Answer, 'text' | 'is_anonymous'>;
type CreateAnswerPayload = AnswerWritableFields;
type UpdateAnswerPayload = Partial<AnswerWritableFields>;

export async function getAllAnswers(questionId: string): Promise<Answer[] | null> {
	// GET /questions/{questionId}/answers/
	try {
		const response = await fetch(
			buildAnswerListUrl(questionId),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error('Failed to fetch answers:', response.statusText);
			return null;
		}

		const data = await response.json();
		return z.array(AnswerSchema).parse(data);
	} catch (error) {
		console.error('Error fetching answers:', error);
		return null;
	}
}

export async function createNewAnswer(
	questionId: string,
	payload: CreateAnswerPayload
): Promise<Answer | null> {
	// POST /questions/{questionId}/answers/
	try {
		const response = await fetch(
			buildAnswerListUrl(questionId),
			buildRequest(HttpRequestType.POST, payload)
		);

		if (!response.ok) {
			console.error('Failed to create answer:', response.statusText);
			return null;
		}

		const data = await response.json();
		return AnswerSchema.parse(data);
	} catch (error) {
		console.error('Error creating answer:', error);
		return null;
	}
}

export async function getAnswerDetails(answerId: string | number): Promise<Answer | null> {
	// GET /answers/{answerId}
	try {
		const response = await fetch(
			buildAnswerDetailUrl(answerId.toString()),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error('Failed to fetch answer:', response.statusText);
			return null;
		}

		const data = await response.json();
		return AnswerSchema.parse(data);
	} catch (error) {
		console.error('Error fetching answer:', error);
		return null;
	}
}

export async function updateAnswerDetails(
	answerId: string | number,
	payload: UpdateAnswerPayload
): Promise<Answer | null> {
	// PUT /answers/{answerId}
	try {
		const response = await fetch(
			buildAnswerDetailUrl(answerId.toString()),
			buildRequest(HttpRequestType.PUT, payload)
		);

		if (!response.ok) {
			console.error('Failed to update answer:', response.statusText);
			return null;
		}

		const data = await response.json();
		return AnswerSchema.parse(data);
	} catch (error) {
		console.error('Error updating answer:', error);
		return null;
	}
}

export async function deleteAnswer(answerId: string | number): Promise<boolean> {
	// DELETE /answers/{answerId}
	try {
		const response = await fetch(
			buildAnswerDetailUrl(answerId.toString()),
			buildRequest(HttpRequestType.DELETE)
		);

		if (!response.ok) {
			console.error('Failed to delete answer:', response.status, response.statusText);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Error deleting answer:', error);
		return false;
	}
}

function buildAnswerListUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId);
	return `${ANSWER_LIST_URL}${encodedQuestionId}/answers/`;
}

function buildAnswerDetailUrl(answerId: string): string {
	const encodedAnswerId = encodeURIComponent(answerId);
	return `${ANSWER_DETAIL_URL}${encodedAnswerId}/`;
}
