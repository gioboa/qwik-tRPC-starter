/* eslint-disable no-console */
import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { Framework } from '@prisma/client';
import { tServer } from '~/server/router';

export default component$(() => {
	const itemsResource = useResource$<Framework[]>(() => getFrameworks());

	return (
		<Resource
			value={itemsResource}
			onPending={() => <>Loading...</>}
			onRejected={(error) => <>Error: {error.message}</>}
			onResolved={(items: Framework[]) => (
				<div>
					Records:
					{items.map((item) => (
						<>
							<div>Id: {item.id}</div>
							<div>Name: {item.name}</div>
							<hr />
						</>
					))}
				</div>
			)}
		/>
	);
});

export async function getFrameworks(): Promise<Framework[]> {
	return await tServer.framework.list('');
}
