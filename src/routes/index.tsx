/* eslint-disable no-console */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { tServer } from '~/server/router';

export const useFrameworks = routeLoader$(async () => {
	return await tServer.framework.list('');
});

export default component$(() => {
	const frameworksSig = useFrameworks();

	return (
		<div>
			Records:
			{frameworksSig.value.map((framework) => (
				<>
					<div>Id: {framework.id}</div>
					<div>Name: {framework.name}</div>
					<hr />
				</>
			))}
		</div>
	);
});
