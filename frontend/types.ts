/**
 * @overview Type definitions for the Help app.
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/help/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import 'evergreen-ui';

declare module 'evergreen-ui' {
	interface DefaultTheme {
		title: string;
	}
}

export type HoagieUser = {
	name?: string;
	email?: string;
};

export type Tag = {
	id: number;
	name: string;
};

export type Question = {
	id: number;
	user: HoagieUser;
	title: string;
	tags: Tag[];
	course: string[];
	details: string;
	createTime: string;
	lastUpdatedTime: string;
	hearts: number;
	view: number;
	userIsAnonymous: boolean;
};

export type Answer = {
	id: number;
	question: number;
	user: HoagieUser;
	text: string;
	hearts: number;
	isAnonymous: boolean;
	createdAt: string;
	updatedAt: string;
	comments: Comment[];
};

export type Comment = {
	id: number;
	answer: number;
	user: HoagieUser;
	text: string;
	hearts: number;
	isAnonymous: boolean;
	createdAt: string;
	updatedAt: string;
};

export type Notification = {
	id: number;
	user: HoagieUser;
	question: Question;
	answer: Answer;
	comment: Comment | null;
	isRead: boolean;
	createdAt: string;
};
