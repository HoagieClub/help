/**
 * @overview Next.js middleware file for the template app.
 * Middleware allows you to intercept requests before they reach the server.
 * Learn more: https://nextjs.org/docs/app/building-your-application/routing/middleware
 *
 * Copyright © 2021-2025 Hoagie Club and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree or at https://github.com/hoagieclub/template/LICENSE.
 *
 * Permission is granted under the MIT License to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the software. This software is provided "as-is", without warranty of any kind.
 */

import { NextResponse } from 'next/server';

import { auth0 } from './lib/auth0';

import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
	const authRes = await auth0.middleware(request);

	// Authentication routes — let the middleware handle it
	if (request.nextUrl.pathname.startsWith('/auth')) {
		return authRes;
	}

	// Check if the user is trying to access one of the protected routes
	if (
		request.nextUrl.pathname.startsWith('/feature1') ||
		request.nextUrl.pathname.startsWith('/feature2') ||
		request.nextUrl.pathname.startsWith('/feature3')
	) {
		const { origin } = new URL(request.url);
		const session = await auth0.getSession();

		// User does not have a session — redirect to login
		if (!session) {
			return NextResponse.redirect(
				`${origin}/auth/login?returnTo=${request.nextUrl.pathname}`
			);
		}
	}

	return authRes;
}

// Apply this middleware to all routes except static assets
export const config = {
	/*
	 * Match all request paths except for the ones starting with:
	 * - _next/static (static files)
	 * - _next/image (image optimization files)
	 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
	 */
	matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
