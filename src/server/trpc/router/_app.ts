import { router } from "../trpc";
import { examenesRouter } from "./examenes";

export const appRouter = router({
  examenes: examenesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
