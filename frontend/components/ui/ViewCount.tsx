import { Eye } from 'lucide-react';

import { Stat } from './Stat';

export type ViewCountProps = {
	count: number;
};

/**
 * "👁 45 views" on a question, read-only. On a question page, get the count from useQuestionView
 * so opening the page counts a view.
 *
 * @example
 * <ViewCount count={question.view} />
 *
 * const views = useQuestionView({ questionId: question.id, initialCount: question.view });
 * <ViewCount count={views} />
 */
export function ViewCount({ count }: ViewCountProps) {
	return (
		<Stat icon={Eye}>
			{count.toLocaleString('en-US')} {count === 1 ? 'view' : 'views'}
		</Stat>
	);
}
