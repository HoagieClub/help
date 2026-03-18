export type UserPost = {
	id: number;
	title: string;
	body: string;
	type: string;
	course?: string;
	tags: string[];
	hearts: number;
	views: number;
	createdAt: string;
};

export type UserProfile = {
	name: string;
	email: string;
	postsCount: number;
	classYear: number;
	major: string;
};

export type UserPostsProps = {
	user: UserProfile;
	questions: UserPost[];
	answers: UserPost[];
	comments: UserPost[];
};
