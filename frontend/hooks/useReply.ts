'use client';

import { createNewAnswer } from '@/api/answerService';
import { createNewComment } from '@/api/commentService';

import { useAction } from './useAction';

/**
 * What the reply is posted under. A reply to a question is an answer; a reply to an answer is a
 * comment. Comments can't have their own replies, so "Reply" under a comment posts a comment on
 * its answer: pass kind 'answer' with that answer's id.
 */
export type ReplyKind = 'question' | 'answer';

type Reply = NonNullable<Awaited<ReturnType<typeof createNewAnswer | typeof createNewComment>>>;

function postReply(
	kind: ReplyKind,
	id: string,
	text: string,
	isAnonymous: boolean
): Promise<Reply | null> {
	const payload = { text, is_anonymous: isAnonymous };
	return kind === 'question' ? createNewAnswer(id, payload) : createNewComment(id, payload);
}

export type UseReplyOptions = {
	kind: ReplyKind;
	/** The question id (kind 'question') or answer id (kind 'answer'). */
	id: string | number;
};

/**
 * Post a reply to a question or an answer. Returns { submit, pending, error, clearError }.
 * `submit` resolves to the created answer or comment, or null if it failed (then `error` is set).
 *
 * @example
 * const reply = useReply({ kind: 'answer', id: answer.id });
 * const created = await reply.submit(text, isAnonymous);
 */
export function useReply({ kind, id }: UseReplyOptions) {
	const { run, pending, error, clearError } = useAction(
		(text: string, isAnonymous: boolean = false) =>
			postReply(kind, String(id), text, isAnonymous),
		"Couldn't post your reply. Please try again."
	);

	return { submit: run, pending, error, clearError };
}
