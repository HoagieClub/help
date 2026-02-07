'use client';

import { Heading, Pane, Text, majorScale } from 'evergreen-ui';
import { useParams } from 'next/navigation';

export function QuestionPage() {
	const params = useParams<{ id: string }>(); // read id from the URL
	const questionId = params.id;

	return (
		<Pane
			marginX='auto'
			padding={majorScale(2)}
			marginLeft={majorScale(16)}
			marginTop={majorScale(8)}
			marginRight={majorScale(16)}
		>
			<Heading size={900} marginBottom={majorScale(2)} fontWeight={1000}>
				Question Title
			</Heading>
			<Text size={500}>Question ID: {questionId}</Text>
		</Pane>
	);
}

export default QuestionPage;
