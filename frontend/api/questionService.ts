import { z } from 'zod';

const QUESTIONS_URL = `${process.env.BACKEND}/questions/`;

const QuestionSchema = z.object({
	// Define the schema based on the backend model
});

type Question = z.infer<typeof QuestionSchema>;

export async function getAllQuestions(): Promise<Question[] | null> {
    // GET /questions
    return null;
}

export async function createNewQuestion(): Promise<Question | null> {
    // POST /questions
    return null;
}

export async function getQuestionDetails(questionId: string): Promise<Question | null> {
    // GET /questions/{questionId}
    return null;
}

export async function updateQuestionDetails(questionId: string): Promise<Question | null> {
    // PUT /questions/{questionId}
    return null;
}

export async function deleteQuestion(questionId: string): Promise<Question | null> {
    // DELETE /questions/{questionId}
    return null;
}

function buildQuestionDetailsUrl(questionId: string): string {
    const encodedQuestionId = encodeURIComponent(questionId.toString());

    return `${QUESTIONS_URL}${encodedQuestionId}`;
}