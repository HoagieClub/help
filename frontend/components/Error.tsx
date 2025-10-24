/**
 * @overview Standardized error handling component for the template app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

'use client';

import React from 'react';

import { Alert } from 'evergreen-ui';

export type ErrorWithMessage = {
	message: string;
	status?: number;
};

// Type guard to check if an error has a message
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
}

// Convert any error to ErrorWithMessage type
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) {
		return maybeError;
	}

	try {
		const error = new Error(JSON.stringify(maybeError));
		// Check if the error has a 'status' property and attach it
		if ((maybeError as Record<string, unknown>).status) {
			return {
				message: error.message,
				status: (maybeError as Record<string, unknown>).status as number,
			};
		}
		return { message: error.message };
	} catch {
		// Fallback if stringification fails (e.g., circular reference errors)
		return { message: String(maybeError) };
	}
}

// Get error message from any error
function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error).message;
}

// Props for the ErrorMessage component
interface ErrorMessageProps {
	error: unknown;
	title?: string;
	width?: string;
}

// ErrorMessage component
export function ErrorMessage({
	error,
	title = 'An error occurred.',
	width = '100%',
}: ErrorMessageProps) {
	const errorMessage = getErrorMessage(error);

	return (
		errorMessage && (
			<Alert intent='danger' title={title} marginY={20} width={width}>
				{errorMessage}
			</Alert>
		)
	);
}

// Utility function to handle errors in async functions
export async function handleError<T>(
	promise: Promise<T>
): Promise<[T | null, ErrorWithMessage | null]> {
	try {
		const data = await promise;
		return [data, null];
	} catch (error) {
		return [null, toErrorWithMessage(error)];
	}
}

export { isErrorWithMessage, toErrorWithMessage, getErrorMessage };
