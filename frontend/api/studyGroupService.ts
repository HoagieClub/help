import { z } from 'zod';

import { HttpRequestType, buildRequest } from './common';

const STUDY_GROUPS_URL = `${process.env.BACKEND}/study-groups/`;

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

export async function getStudyGroup(studyGroupId: string): Promise<StudyGroup | null> {
	try {
		const response = await fetch(
			buildStudyGroupUrl(studyGroupId),
			buildRequest(HttpRequestType.GET)
		);

		if (!response.ok) {
			console.error(
				`Failed to fetch study group ${studyGroupId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = StudyGroupSchema.safeParse(data);

		if (!parsed.success) {
			console.error(`Failed to parse study group ${studyGroupId}:`, parsed.error.issues);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error fetching study group ${studyGroupId}:`, error);
		return null;
	}
}

export async function updateStudyGroup(
	studyGroupId: string,
	payLoad: StudyGroupPayload
): Promise<StudyGroup | null> {
	try {
		const response = await fetch(
			buildStudyGroupUrl(studyGroupId),
			buildRequest(HttpRequestType.PUT, payLoad)
		);

		if (!response.ok) {
			console.error(
				`Failed to update study group ${studyGroupId}:`,
				response.status,
				response.statusText
			);
			return null;
		}

		const data = await response.json();
		const parsed = StudyGroupSchema.safeParse(data);

		if (!parsed.success) {
			console.error(
				`Failed to parse updated study group ${studyGroupId}:`,
				parsed.error.issues
			);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error(`Error updating study group ${studyGroupId}:`, error);
		return null;
	}
}

export async function deleteStudyGroup(studyGroupId: string): Promise<boolean> {
	try {
		const response = await fetch(
			buildStudyGroupUrl(studyGroupId),
			buildRequest(HttpRequestType.DELETE)
		);

		if (response.status !== 204) {
			console.error(
				`Failed to delete study group ${studyGroupId}:`,
				response.status,
				response.statusText
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(`Error deleting study group ${studyGroupId}:`, error);
		return false;
	}
}

function buildStudyGroupUrl(studyGroupId: string): string {
	const encodedStudyGroupId = encodeURIComponent(studyGroupId.toString());

	return `${STUDY_GROUPS_URL}${encodedStudyGroupId}/`;
}
