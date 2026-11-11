import { EmptyState, Heading, Stack } from '@/components/ui';
import type { Answer } from '@/types';

import { AnswerItem } from './AnswerItem';

export type AnswerListProps = {
	answers: Answer[];
};

/**
 * Every answer to a question, with a count heading, or an empty state when there are none.
 *
 * @example
 * <AnswerList answers={answers} />
 */
export function AnswerList({ answers }: AnswerListProps) {
	if (answers.length === 0) {
		return <EmptyState title='No answers yet' description='Be the first to answer.' />;
	}

	return (
		<Stack gap='0'>
			<Heading variant='h2' tone='ink'>
				{answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
			</Heading>
			{answers.map((answer) => (
				<AnswerItem key={answer.id} answer={answer} />
			))}
		</Stack>
	);
}
