'use client';

import { useState } from 'react';

/**
 * Runs an async action (like posting an answer) and tracks whether it's running and whether it
 * failed. The API services return `null` on failure, so `null` counts as an error.
 *
 * Feature hooks wrap it, e.g. useCreateAnswer in hooks/mutations.ts.
 *
 * @example
 * const { run, pending, error } = useAction(createNewComment);
 * const created = await run(answerId, { text, is_anonymous: false });
 * if (created) { … }
 */
export function useAction<Args extends unknown[], Result>(
	action: (...args: Args) => Promise<Result | null>,
	errorMessage = 'Something went wrong. Please try again.'
) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function run(...args: Args): Promise<Result | null> {
		setPending(true);
		setError(null);
		const result = await action(...args);
		setPending(false);
		if (result === null) {
			setError(errorMessage);
		}
		return result;
	}

	return { run, pending, error, clearError: () => setError(null) };
}
