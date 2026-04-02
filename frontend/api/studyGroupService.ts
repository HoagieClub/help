import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const STUDY_GROUPS_URL = `${process.env.BACKEND}/studygroups/`;

const StudyGroupSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    leader: z.number(),
    meeting_datetime: z.string(),
    max_spots: z.number(),
    members: z.array(z.number()),
});

type StudyGroup = z.infer<typeof StudyGroupSchema>;

type StudyGroupPayload = {
    title: string;
    description: string;
    leader: number;
    meeting_datetime: string;
    max_spots: number;
};

export async function getAllStudyGroup(): Promise<StudyGroup[] | null> {
    try {
		const response = await fetch(STUDY_GROUPS_URL, buildRequest(HttpRequestType.GET));

		if (!response.ok) {
			console.error('Failed to fetch study groups:', response.status, response.statusText);
			return null;
		}

		const data = await response.json();
		const parsed = z.array(StudyGroupSchema).safeParse(data);

		if (!parsed.success) {
			console.error('Failed to parse study groups:', parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error('Error fetching study groups:', error);
		return null;
	}
}

export async function createNewStudyGroup(payLoad: StudyGroupPayload): Promise<StudyGroup | null> {
    try {
		const response = await fetch(STUDY_GROUPS_URL, buildRequest(HttpRequestType.POST, payLoad));

		if (!response.ok) {
			console.error('Failed to create study group:', response.status, response.statusText);
			return null;
		}

		const data = await response.json();
		const parsed = StudyGroupSchema.safeParse(data);

		if (!parsed.success) {
			console.error('Failed to parse created study group:', parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error('Error creating study group:', error);
		return null;
	}
}

export async function getStudyGroup(studygroupId: string): Promise<StudyGroup | null> {
    try {
		const response = await fetch(
			buildStudyGroupUrl(studygroupId),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch question ${studygroupId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = StudyGroupSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse study group ${studygroupId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error fetching study group ${studygroupId}:`, error);
		return null;
	}
}

export async function updateStudyGroup(studygroupId: string, payLoad: StudyGroupPayload): Promise<StudyGroup | null> {
    try {
		const response = await fetch(
			buildStudyGroupUrl(studygroupId),
			buildRequest(HttpRequestType.PUT, payLoad)
		);

		if (!response.ok) {
			console.error(
				`Failed to update study group ${studygroupId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = StudyGroupSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse updated study group ${studygroupId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error updating study group ${studygroupId}:`, error);
		return null;
	}
}

export async function deleteStudyGroup(studygroupId: string): Promise<boolean> {
    try {
		const response = await fetch(
			buildStudyGroupUrl(studygroupId),
			buildRequest(HttpRequestType.DELETE)
		);

		if (response.status !== 204) {
			console.error(
				`Failed to delete study group ${studygroupId}:`,
				response.status,
				response.statusText
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(`Error deleting study group ${studygroupId}:`, error);
		return false;
	}
}

function buildStudyGroupUrl(studygroupId: string): string {
	const encodedStudyGroupId = encodeURIComponent(studygroupId.toString());

	return `${STUDY_GROUPS_URL}${encodedStudyGroupId}`;
}