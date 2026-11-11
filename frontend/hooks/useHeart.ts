'use client';

import { useState } from 'react';

import { heartAnswer, heartComment, heartQuestion } from '@/api/heartService';

export type HeartKind = 'question' | 'answer' | 'comment';

const TOGGLE: Record<HeartKind, (id: string) => ReturnType<typeof heartQuestion>> = {
	question: heartQuestion,
	answer: heartAnswer,
	comment: heartComment,
};

export type UseHeartOptions = {
	kind: HeartKind;
	id: string | number;
	initialCount: number;
	/** The API doesn't return this on GET yet, so it defaults to false. */
	initialHearted?: boolean;
};

/**
 * Heart/unheart a question, answer or comment.
 * Updates the count right away, then uses the server's answer, or rolls back if the request fails.
 *
 * @example
 * const heart = useHeart({ kind: 'answer', id: answer.id, initialCount: answer.hearts });
 * <HeartButton {...heart} thing='answer' />
 */
export function useHeart({ kind, id, initialCount, initialHearted = false }: UseHeartOptions) {
	const [hearted, setHearted] = useState(initialHearted);
	const [count, setCount] = useState(initialCount);
	const [pending, setPending] = useState(false);

	async function onToggle() {
		if (pending) {
			return;
		}
		const before = { hearted, count };
		setHearted(!hearted);
		setCount(hearted ? count - 1 : count + 1);
		setPending(true);

		const result = await TOGGLE[kind](String(id));
		if (result) {
			setHearted(result.is_hearted);
			setCount(result.hearts);
		} else {
			setHearted(before.hearted);
			setCount(before.count);
		}
		setPending(false);
	}

	return { hearted, count, pending, onToggle };
}
