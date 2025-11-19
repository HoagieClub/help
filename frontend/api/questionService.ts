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

const QuestionPayloadSchema = z.object({
	title: z.string(),
	tags: z.array(z.number()),
	course: z.string().nullable(),
	details: z.string(),
	heart: z.number().min(0),
	view: z.number().min(0),
	user_is_anonymous: z.boolean(),
});

type QuestionPayload = z.infer<typeof QuestionPayloadSchema>;

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

export async function createNewQuestion(payload: QuestionPayload): Promise<Question | null> {
	// POST /questions

	const validated = QuestionPayloadSchema.safeParse(payload);
	if (!validated.success) {
		console.error('Invalid question payload:', validated.error.issues);
		return null;
	}

	try {
		const response = await fetch(
			QUESTIONS_URL,
			buildRequest(HttpRequestType.POST, validated.data)
		);

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
	payload: QuestionPayload
): Promise<Question | null> {
	// PUT /questions/{questionId}
	const validated = QuestionPayloadSchema.safeParse(payload);
	if (!validated.success) {
		console.error('Invalid question payload:', validated.error.issues);
		return null;
	}

	try {
		const response = await fetch(
			buildQuestionDetailsUrl(questionId),
			buildRequest(HttpRequestType.PUT, validated.data)
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

export async function deleteQuestion(questionId: string): Promise<boolean> {
	// DELETE /questions/{questionId}
	try {
		const response = await fetch(
			buildQuestionDetailsUrl(questionId),
			buildRequest(HttpRequestType.DELETE)
		);

		if (response.status != 204) {
			console.error(
				`Failed to delete question ${questionId}:`,
				response.status,
				response.statusText
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(`Error deleting question ${questionId}:`, error);
		return false;
	}
}

function buildQuestionDetailsUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId.toString());

	return `${QUESTIONS_URL}${encodedQuestionId}`;
}
