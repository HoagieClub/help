'use client';

import React from 'react';

import { Heading, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import { Answer } from '../types';
import { AnswerBox } from "./AnswerBox";

type AnswerPanelProps = {
  answers: Answer[];
};

export default function AnswerPanel(props: AnswerPanelProps) {

	return (
		<Pane>
			{/* Main header */}
            <Pane
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                marginBottom={majorScale(1)}
            >
                <Heading size={700} marginBottom={12} fontWeight={800}>
                    {props.answers.length} Answers
                </Heading>
            </Pane>
            {/* Answers list */}
			<Pane marginBottom={majorScale(2)}>
                {props.answers.map((answer, index) => (
                    <AnswerBox key={index} answer={answer} />
                ))}
			</Pane>
		</Pane>
	);
}