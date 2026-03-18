import { SAMPLE_USER_POSTS_PROPS } from '@/components/user/sampleData';
import UserPostsPage from '@/components/user/UserPostsPage';

export default function UserPreviewPage() {
	return <UserPostsPage {...SAMPLE_USER_POSTS_PROPS} />;
}
