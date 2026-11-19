import { z } from 'zod';

import { api } from './common';

const QUESTIONS_URL = `/api/hoagie/questions`;

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
	hearts: z.number().min(0),
	view: z.number().min(0),
	user_is_anonymous: z.boolean(),
});

type Question = z.infer<typeof QuestionSchema>;

type QuestionPayload = {
	title: string;
	tags: number[];
	course: string | null;
	details: string;
	hearts: number;
	view: number;
	user_is_anonymous: boolean;
};

export async function getAllQuestions(): Promise<Question[] | null> {
	// GET /questions
	try {
		const response = await fetch(QUESTIONS_URL, api.get());

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
	try {
		const response = await fetch(QUESTIONS_URL, api.post(payload));

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
		const response = await fetch(buildQuestionDetailsUrl(questionId), api.get());

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
	try {
		const response = await fetch(buildQuestionDetailsUrl(questionId), api.put(payload));

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
		const response = await fetch(buildQuestionDetailsUrl(questionId), api.delete());

		if (response.status !== 204) {
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

// Matches the backend response: {"view": <updated_count>}
const QuestionViewResponseSchema = z.object({
	view: z.number().min(0),
});

type QuestionViewResponse = z.infer<typeof QuestionViewResponseSchema>;

export async function addQuestionView(questionId: string): Promise<QuestionViewResponse | null> {
	// POST /questions/{questionId}/view
	try {
		const response = await fetch(`${buildQuestionDetailsUrl(questionId)}/view`, api.post());

		if (!response.ok) {
			console.error(
				`Failed to count a view of question ${questionId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = QuestionViewResponseSchema.safeParse(data);

		if (!parsed.success) {
			console.error(
				`Failed to parse view count for question ${questionId}:`,
				parsed.error.issues
			);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error counting a view of question ${questionId}:`, error);
		return null;
	}
}

function buildQuestionDetailsUrl(questionId: string): string {
	const encodedQuestionId = encodeURIComponent(questionId.toString());
	return `${QUESTIONS_URL}/${encodedQuestionId}`;
}
