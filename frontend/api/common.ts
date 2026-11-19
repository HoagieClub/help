function buildRequest(method: string, body?: object): RequestInit {
	return {
		method,
		headers: { 'Content-Type': 'application/json' },
		...(body && { body: JSON.stringify(body) }),
	};
}

export const api = {
	get: () => buildRequest('GET'),
	post: (body?: object) => buildRequest('POST', body),
	put: (body: object) => buildRequest('PUT', body),
	delete: () => buildRequest('DELETE'),
};
