'use client';

import { createNewAnswer } from '@/api/answerService';
import { createNewComment } from '@/api/commentService';
import { createNewQuestion } from '@/api/questionService';
import { createNewStudyGroup } from '@/api/studyGroupService';

import { useAction } from './useAction';

/**
 * One hook per "create" action, so components never import from @/api.
 * Each returns { run, pending, error, clearError } from useAction.
 */

export function useCreateQuestion() {
	return useAction(createNewQuestion, "Couldn't post your question. Please try again.");
}

export function useCreateAnswer() {
	return useAction(
		createNewAnswer,
		"Couldn't post your answer. Check your connection and try again."
	);
}

export function useCreateComment() {
	return useAction(createNewComment, "Couldn't post your comment. Please try again.");
}

export function useCreateStudyGroup() {
	return useAction(createNewStudyGroup, "Couldn't create the study group. Please try again.");
}
