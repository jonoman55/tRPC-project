
import express, { Application } from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

import { appRouter } from "./routers";
import { createContext } from "./context";

const app: Application = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({
    router: appRouter,
    createContext,
}));

const server = app.listen(3000, () => {
    console.log("Server is now listening on port 3000");
});

applyWSSHandler({
    wss: new ws.Server({ server }),
    router: appRouter,
    createContext,
});

export type AppRouter = typeof appRouter;