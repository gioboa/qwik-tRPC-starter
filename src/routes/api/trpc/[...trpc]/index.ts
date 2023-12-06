import { RequestHandler } from '@builder.io/qwik-city';
import { HTTPHeaders } from '@trpc/server/dist/http/internals/types';
import { resolveHTTPResponse } from '@trpc/server/http';
import { createContext } from '../../../../server/context';
import { appRouter } from '../../../../server/router/index';

export const onRequest: RequestHandler = async ({ request, params, json }) => {
	try {
		const httpResponse = await resolveHTTPResponse({
			router: appRouter,
			path: params.trpc,
			req: {
				body: await request.text(),
				headers: request.headers as unknown as HTTPHeaders,
				method: request.method,
				query: new URL(request.url).searchParams,
			},
			createContext,
		});
		json(200, JSON.parse(httpResponse.body || '{}'));
	} catch (error: any) {
		throw error(500, 'ERROR: Internal Server Error');
	}
};
