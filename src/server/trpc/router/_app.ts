import { router } from "../trpc";
import { authRouter } from "./auth";
import { transactionRouter } from "./transaction";
import { adminRouter } from "./admin";
import { generalRouter } from "./general";

export const appRouter = router({
  auth: authRouter,
  transaction: transactionRouter,
  admin: adminRouter,
  general: generalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
