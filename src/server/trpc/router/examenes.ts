import { router, publicProcedure } from "../trpc";

export const examenesRouter = router({
  getExamen: publicProcedure.query(async () => {
    const res = "World";

    return res;
  }),
});
