import { router, publicProcedure } from "../trpc";

export const examenesRouter = router({
  getExamen: publicProcedure.query(async () => {
    let res = "World";

    return res;
  }),
});
