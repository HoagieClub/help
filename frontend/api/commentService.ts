import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const COMMENT_LIST_URL = `${process.env.BACKEND}/answers/`;
const COMMENT_DETAIL_URL = `${process.env.BACKEND}/comments/`;

const CommentSchema = z.object({
	id: z.number().int(),
	answer: z.number().int(),
	user: z.number().int(),
	text: z.string(),
	hearts: z.number().int().nonnegative(),
	is_anonymous: z.boolean(),
	created_at: z.string(),
	updated_at: z.string(),
});

type Comment = z.infer<typeof CommentSchema>;

async function parseComment(res: Response): Promise<Comment | null> {
	if (res.status === 204) return null;
	const data = await res.json();
	return CommentSchema.parse(data);
}

async function parseComments(res: Response): Promise<Comment[] | null> {
	if (res.status === 204) return null;
	const data = await res.json();
	return z.array(CommentSchema).parse(data);
}

export async function getAllComments(answerId: string | number): Promise<Comment[] | null> {
	// GET /answers/{answerId}/comments/
	try {
		const response = await fetch(
			buildCommentListUrl(answerId.toString()),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error('Failed to fetch comments:', response.statusText);
			return null;
		}

		return await parseComments(response);
	} catch (error) {
		console.error('Error fetching comments:', error);
		return null;
	}
}

type CreateCommentPayload = {
	text: string;
	is_anonymous?: boolean;
};

export async function createNewComment(
	answerId: string | number,
	payload: CreateCommentPayload
): Promise<Comment | null> {
	// POST /answers/{answerId}/comments/
	try {
		const response = await fetch(
			buildCommentListUrl(answerId.toString()),
			buildRequest(HttpRequestType.POST, payload)
		);

		if (!response.ok) {
			console.error('Failed to create comment:', response.statusText);
			return null;
		}

		return await parseComment(response);
	} catch (error) {
		console.error('Error creating comment:', error);
		return null;
	}
}

export async function getCommentDetails(commentId: string | number): Promise<Comment | null> {
	// GET /comments/{commentId}
	try {
		const response = await fetch(
			buildCommentDetailUrl(commentId.toString()),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error('Failed to fetch comment:', response.statusText);
			return null;
		}

		return await parseComment(response);
	} catch (error) {
		console.error('Error fetching comment:', error);
		return null;
	}
}

type UpdateCommentPayload = Partial<Pick<Comment, 'text' | 'is_anonymous' | 'hearts'>>;

export async function updateCommentDetails(
	commentId: string | number,
	payload: UpdateCommentPayload
): Promise<Comment | null> {
	// PUT /comments/{commentId}
	try {
		const response = await fetch(
			buildCommentDetailUrl(commentId.toString()),
			buildRequest(HttpRequestType.PUT, payload)
		);

		if (!response.ok) {
			console.error('Failed to update comment:', response.statusText);
			return null;
		}

		return await parseComment(response);
	} catch (error) {
		console.error('Error updating comment:', error);
		return null;
	}
}

export async function deleteComment(commentId: string | number): Promise<boolean> {
	try {
		const res = await fetch(
			buildCommentDetailUrl(commentId.toString()),
			buildRequest(HttpRequestType.DELETE)
		);
		if (!res.ok) {
			console.error('Failed to delete comment:', res.status, res.statusText);
			return false;
		}
		return true;
	} catch (err) {
		console.error('Error deleting comment:', err);
		return false;
	}
}

function buildCommentListUrl(answerId: string): string {
	const encodedAnswerId = encodeURIComponent(answerId.toString());
	return `${COMMENT_LIST_URL}${encodedAnswerId}/comments/`;
}

function buildCommentDetailUrl(commentId: string): string {
	const encodedCommentId = encodeURIComponent(commentId.toString());
	return `${COMMENT_DETAIL_URL}${encodedCommentId}/`;
}
