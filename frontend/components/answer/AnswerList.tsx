import { EmptyState, Heading, Stack } from '@/components/ui';
import type { Answer } from '@/types';

import { AnswerItem } from './AnswerItem';

export type AnswerListProps = {
	answers: Answer[];
};

/**
 * Every answer to a question under an "n Answers" heading, or an empty state when there are none.
 *
 * @example
 * <AnswerList answers={answers} />
 */
export function AnswerList({ answers }: AnswerListProps) {
	if (answers.length === 0) {
		return <EmptyState title='No answers yet' description='Be the first to reply.' />;
	}

	return (
		<Stack gap='4'>
			<Heading variant='title' as='h2'>
				{answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
			</Heading>
			<Stack gap='6'>
				{answers.map((answer) => (
					<AnswerItem key={answer.id} answer={answer} />
				))}
			</Stack>
		</Stack>
	);
}
