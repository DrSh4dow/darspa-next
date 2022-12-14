import { router } from "../trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transaction";

export const appRouter = router({
  auth: authRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
