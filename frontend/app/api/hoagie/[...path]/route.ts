import { NextResponse } from 'next/server';

import { auth0 } from '@/lib/auth0';

import type { NextRequest } from 'next/server';

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
	const path = (await params).path.join('/');
	const search = request.nextUrl.search;
	const url = `${process.env.HOAGIE_API_URL}${path}/${search}`;

	const headers = new Headers();
	const contentType = request.headers.get('Content-Type');
	if (contentType) {
		headers.set('Content-Type', contentType);
	}

	try {
		const accessToken = await auth0.getAccessToken();
		headers.set('Authorization', `Bearer ${accessToken.token}`);
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 401 }
		);
	}

	const fetchReq: RequestInit = {
		method: request.method,
		headers,
	};

	if (request.method !== 'GET') {
		fetchReq.body = await request.text();
	}

	try {
		const response = await fetch(url, fetchReq);
		return new NextResponse(response.body, {
			status: response.status,
			headers: { 'Content-Type': response.headers.get('Content-Type') ?? 'application/json' },
		});
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Unknown error' },
			{ status: 502 }
		);
	}
}

// Delegate all http requests to the handler
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
