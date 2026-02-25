'use client';

import React from 'react';

import CommentsPanel from '../CommentsPanel/CommentsPanel';

import { Answer } from '../types';

import styles from './AnswerBox.module.css';

interface AnswerBoxProps {
    answerData: Answer;
}

/**
 * Reusing the formatting logic consistent with QuestionPanel
 */
function formatTimePassed(input: Date | string | number): string {
    const now = Date.now();
    const past = new Date(input).getTime();
    const diffMs = now - past;
    if (diffMs < 0) return 'just now';

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
    if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
    return `${days} day${days === 1 ? '' : 's'} ago`;
}

function formatMetadata(
    user: string,
    createdAt: Date | string,
    userIsAnonymous: boolean
): string {
    const displayUser = userIsAnonymous ? 'Anonymous' : user;
    const displayTimePassed = formatTimePassed(createdAt);
    return `${displayUser} • ${displayTimePassed}`;
}

const AnswerBox = ({ answerData }: AnswerBoxProps) => {
    const { 
        author_name, 
        text, 
        created_at, 
        likes, 
        is_anonymous, 
        comments 
    } = answerData;

    const metadata = formatMetadata(author_name, created_at, is_anonymous);

    return (
        <div className={styles.answerContainer}>
            <div className={styles.header}>
                <span className={styles.metadata}>{metadata}</span>
                <div className={styles.likesCount}>
                    <span className={styles.likesLabel}>Likes:</span> {likes}
                </div>
            </div>
            
            <div className={styles.answerText}>
                {text}
            </div>

            <div className={styles.commentsWrapper}>
                <CommentsPanel comments={comments} />
            </div>
        </div>
    );
};

export default AnswerBox;