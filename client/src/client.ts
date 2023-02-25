// DOCS : https://vitejs.dev/guide/
// DOCS : https://trpc.io/docs/client

import { createTRPCProxyClient, httpBatchLink, splitLink, wsLink, createWSClient } from "@trpc/client";

import type { AppRouter } from './../../server/api';

const wsClient = createWSClient({
    url: "ws://localhost:3000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
    links: [
        splitLink({
            condition: (op) => {
                return op.type === "subscription";
            },
            true: wsLink({
                client: wsClient,
            }),
            false: httpBatchLink({
                url: "http://localhost:3000/trpc",
            }),
        }),
    ],
});

document.addEventListener("click", () => {
    client.users.update.mutate({ userId: "1", name: "John" });
});

async function main() {
    // base app query request
    // const result = await client.sayHi.query();
    // console.log(result);

    // base app mutate request
    // const result = await client.logToServer.mutate("Hi from client");
    // console.log(result);

    // nested user query request
    // const result = await client.users.getUser.query({ userId: "1" });
    // console.log(result);

    // nested user mutate request
    // const result = await client.users.update.mutate({ userId: "1", name: "John" });
    // console.log(result);

    // nested user admin query
    // const result = await client.secretData.query();
    // console.log(result);

    // nested user ws subscribe
    client.users.onUpdate.subscribe(undefined, {
        onData: (id) => {
            console.log("Updated: ", id);
        },
    });
    wsClient.close();
};

main();