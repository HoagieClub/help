import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const QUESTIONS_URL = `${process.env.BACKEND}/questions/`;

const QuestionSchema = z.object({
	// Define the schema based on the backend model
	id: z.number(),
	user: z.number(),
	title: z.string(),
	tags: z.array(z.number()),
	course: z.string().nullable(),
	details: z.string(),
	create_time: z.string(),
	last_updated_time: z.string(),
	heart: z.number().min(0),
	view: z.number().min(0),
	user_is_anonymous: z.boolean(),
});

type Question = z.infer<typeof QuestionSchema>;

export async function getAllQuestions(): Promise<Question[] | null> {
	// GET /questions
	try {
		const response = await fetch(QUESTIONS_URL, buildRequest(HttpRequestType.GET));

		if (!response.ok) {
			console.error('Failed to fetch questions:', response.status, response.statusText);
			return null;
		}

		const data = await response.json();
		const parsed = z.array(QuestionSchema).safeParse(data);

		if (!parsed.success) {
			console.error('Failed to parse questions:', parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error('Error fetching questions:', error);
		return null;
	}
}

export async function createNewQuestion(
	payload: Record<string, unknown>
): Promise<Question | null> {
	// POST /questions
	try {
		const response = await fetch(QUESTIONS_URL, buildRequest(HttpRequestType.POST, payload));

		if (!response.ok) {
			console.error('Failed to create question:', response.status, response.statusText);
			return null;
		}

		const data = await response.json();
		const parsed = QuestionSchema.safeParse(data);

		if (!parsed.success) {
			console.error('Failed to parse created question:', parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error('Error creating question:', error);
		return null;
	}
}

export async function getQuestionDetails(questionId: string): Promise<Question | null> {
	// GET /questions/{questionId}
	try {
		const response = await fetch(
			buildQuestionDetailsUrl(questionId),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch question ${questionId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = QuestionSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse question ${questionId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error fetching question ${questionId}:`, error);
		return null;
	}
}

export async function updateQuestionDetails(
	questionId: string,
	payload: Record<string, unknown>
): Promise<Question | null> {
	// PUT /questions/{questionId}
	try {
		const response = await fetch(
			buildQuestionDetailsUrl(questionId),
			buildRequest(HttpRequestType.PUT, payload)
		);

		if (!response.ok) {
			console.error(
				`Failed to update question ${questionId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = QuestionSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse updated question ${questionId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error updating question ${questionId}:`, error);
		return null;
	}
}

export async function deleteQuestion(questionId: string): Promise<Question | null> {
	// DELETE /questions/{questionId}
	try {
		const response = await fetch(
			buildQuestionDetailsUrl(questionId),
			buildRequest(HttpRequestType.DELETE)
		);

		if (!response.ok) {
			console.error(
				`Failed to delete question ${questionId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		if (response.status === 204) {
			return null; // No content case
		}

		const data = await response.json();
		const parsed = QuestionSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse deleted question ${questionId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error deleting question ${questionId}:`, error);
		return null;
	}
}

function buildQuestionDetailsUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId.toString());

	return `${QUESTIONS_URL}${encodedQuestionId}`;
}
