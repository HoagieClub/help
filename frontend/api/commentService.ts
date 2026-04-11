import { z } from 'zod';

import { api } from './common';

const COMMENT_LIST_URL = `/api/hoagie/answers/`;
const COMMENT_DETAIL_URL = `/api/hoagie/comments/`;

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
type CommentWritableFields = Pick<Comment, 'text' | 'is_anonymous'>;
type CreateCommentPayload = CommentWritableFields;
type UpdateCommentPayload = Partial<CommentWritableFields>;

export async function getAllComments(answerId: string): Promise<Comment[] | null> {
	// GET /answers/{answerId}/comments/
	try {
		const response = await fetch(buildCommentListUrl(answerId), api.get());

		if (!response.ok) {
			console.error('Failed to fetch comments:', response.statusText);
			return null;
		}

		const data = await response.json();
		return z.array(CommentSchema).parse(data);
	} catch (error) {
		console.error('Error fetching comments:', error);
		return null;
	}
}

export async function createNewComment(
	answerId: string,
	payload: CreateCommentPayload
): Promise<Comment | null> {
	// POST /answers/{answerId}/comments/
	try {
		const response = await fetch(buildCommentListUrl(answerId), api.post(payload));

		if (!response.ok) {
			console.error('Failed to create comment:', response.statusText);
			return null;
		}

		const data = await response.json();
		return CommentSchema.parse(data);
	} catch (error) {
		console.error('Error creating comment:', error);
		return null;
	}
}

export async function getCommentDetails(commentId: string | number): Promise<Comment | null> {
	// GET /comments/{commentId}
	try {
		const response = await fetch(buildCommentDetailUrl(commentId.toString()), api.get());

		if (!response.ok) {
			console.error('Failed to fetch comment:', response.statusText);
			return null;
		}

		const data = await response.json();
		return CommentSchema.parse(data);
	} catch (error) {
		console.error('Error fetching comment:', error);
		return null;
	}
}

export async function updateCommentDetails(
	commentId: string | number,
	payload: UpdateCommentPayload
): Promise<Comment | null> {
	// PUT /comments/{commentId}
	try {
		const response = await fetch(buildCommentDetailUrl(commentId.toString()), api.put(payload));

		if (!response.ok) {
			console.error('Failed to update comment:', response.statusText);
			return null;
		}

		const data = await response.json();
		return CommentSchema.parse(data);
	} catch (error) {
		console.error('Error updating comment:', error);
		return null;
	}
}

export async function deleteComment(commentId: string | number): Promise<boolean> {
	try {
		const response = await fetch(buildCommentDetailUrl(commentId.toString()), api.delete());
		if (!response.ok) {
			console.error('Failed to delete comment:', response.status, response.statusText);
			return false;
		}
		return true;
	} catch (err) {
		console.error('Error deleting comment:', err);
		return false;
	}
}

function buildCommentListUrl(answerId: string): string {
	const encodedAnswerId = encodeURIComponent(answerId);
	return `${COMMENT_LIST_URL}${encodedAnswerId}/comments`;
}

function buildCommentDetailUrl(commentId: string): string {
	const encodedCommentId = encodeURIComponent(commentId);
	return `${COMMENT_DETAIL_URL}${encodedCommentId}`;
}
