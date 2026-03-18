import UserPostsPage from '@/components/user/UserPostsPage';
import { SAMPLE_USER_POSTS_PROPS } from '@/components/user/sampleData';

export default function UserPreviewPage() {
	return <UserPostsPage {...SAMPLE_USER_POSTS_PROPS} />;
}
