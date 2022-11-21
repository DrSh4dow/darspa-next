import { router } from "../trpc";
import { instagramRouter } from "./instagram";

export const appRouter = router({
  instagram: instagramRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
