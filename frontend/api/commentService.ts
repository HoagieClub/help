import { z } from 'zod';

const COMMENT_LIST_URL = `${process.env.BACKEND}/answers/`;
const COMMENT_DETAIL_URL = `${process.env.BACKEND}/comments/`;


const CommentSchema = z.object({
    // Define the schema based on the backend model
});

type Comment = z.infer<typeof CommentSchema>;

export async function getAllComments(): Promise<Comment[] | null> {
    // GET answers/{answerId}/comments/
}

export async function createNewComment(): Promise<Comment | null> {
    // POST answers/{answerId}/comments/
}

export async function getCommentDetails(commentId: string): Promise<Comment | null> {
    // GET /comments/{commentId}
    return null;
}

export async function updateCommentDetails(commentId: string): Promise<Comment | null> {
    // PUT /comments/{commentId}
    return null;
}

export async function deleteComment(commentId: string): Promise<Comment | null> {
    // DELETE /comments/{commentId}
    return null;
}

function buildCommentListUrl(questionId: string): string {
    const encodedQuestionId = encodeURIComponent(questionId.toString());
    return `${COMMENT_LIST_URL}${encodedQuestionId}/comments/`;
}

function buildCommentDetailUrl(commentId: string): string {
    const encodedCommentId = encodeURIComponent(commentId.toString());
    return `${COMMENT_DETAIL_URL}${encodedCommentId}/`;
}