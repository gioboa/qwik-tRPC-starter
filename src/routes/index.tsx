/* eslint-disable no-console */
import {component$, Resource, useResource$} from '@builder.io/qwik';
import {isServer} from "@builder.io/qwik/build";


export default component$(() => {


    const itemsResource = useResource$(async () => {
        if (isServer) {
            const {tServer} = await import('~/server/router')
            return tServer.framework.list('')
        }
        const {trpc} = await import('../client/trpc')
        return trpc.framework.list.query('')
    });

    return (

        <Resource
            value={itemsResource}
            onPending={() => <>Loading...</>}
            onRejected={(error) => <>Error: {error.message}</>}
            onResolved={(resp) => (
                <div>
                    trpcResponse:
                    {resp}
                </div>
            )}
        />

    );
});


