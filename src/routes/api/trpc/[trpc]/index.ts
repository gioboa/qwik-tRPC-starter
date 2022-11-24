import { RequestHandler } from '@builder.io/qwik-city';
import { HTTPHeaders } from '@trpc/server/dist/http/internals/types';


const handler: RequestHandler = async ({ request, response, params }) => {

	const {resolveHTTPResponse} = await import("@trpc/server/http");
	const {appRouter} = await import("../../../../server/router/index");
	const {createContext} = await import("../../../../server/context");


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
		response.status = httpResponse.status;
		return JSON.parse(httpResponse.body || '{}');
	} catch (error: any) {
		response.status = 500;
		return 'Internal Server Error';
	}
};

export const onGet = handler;
export const onPost = handler;
export const onPut = handler;
export const onDelete = handler;
export const onPatch = handler;
export const onHead = handler;
export const onOptions = handler;
