import { t, adminProcedure } from "../trpc";
import { userRouter } from './users';

export const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "Hi";
    }),
    logToServer: t.procedure.input((v) => {
        if (typeof v === "string") return v;
        throw new Error("Invalid Input: Expected string");
    }).mutation((req) => {
        console.log(`Client says: ${req.input}`);
        return true;
    }),
    secretData: adminProcedure.query(({ ctx }) => {
        console.log(ctx.user);
        return "Super top secret admin data";
    }),
    users: userRouter,
});

// export const mergedRouter = t.mergeRouters(appRouter, userRouter);