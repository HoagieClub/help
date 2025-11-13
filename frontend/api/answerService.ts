import { z } from 'zod';

const ANSWERS_DETAIL_URL = `${process.env.BACKEND}/answers/`;
const ANSWERS_LIST_URL = `${process.env.BACKEND}/questions/`;


const AnswerSchema = z.object({
    // Define the schema based on the backend model
});

type Answer = z.infer<typeof AnswerSchema>;

export async function getAllAnswers(): Promise<Answer[] | null> {
    // GET /questions/{questionId}/answers/
    return null;
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