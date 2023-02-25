// DOCS: https://vitejs.dev/guide/
// DOCS: https://trpc.io/

import {
    createTRPCProxyClient,
    // loggerLink,
    httpBatchLink,
    splitLink,
    wsLink,
    createWSClient,
} from "@trpc/client";

import type { AppRouter } from './../../server/api';

const wsClient = createWSClient({
    url: "ws://localhost:3000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
    links: [
        // loggerLink(),
        splitLink({
            condition: (op) => {
                return op.type === "subscription";
            },
            true: wsLink({
                client: wsClient,
            }),
            false: httpBatchLink({
                url: "http://localhost:3000/trpc",
                // headers: { Authorization: "TOKEN" },
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

    // base app mutation request
    // const result = await client.logToServer.mutate("Hi from client");
    // console.log(result);

    // nested get user query request
    // const result = await client.users.getUser.query({ userId: "1" });
    // console.log(result);

    // nested mutate user request
    // const result = await client.users.update.mutate({ userId: "1", name: "John" });
    // console.log(result);

    // nested admin query
    // const result = await client.secretData.query();
    // console.log(result);

    client.users.onUpdate.subscribe(undefined, {
        onData: (id) => {
            console.log("Updated: ", id);
        },
    });
    wsClient.close();
};

main();