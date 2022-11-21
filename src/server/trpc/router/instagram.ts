import { router, publicProcedure } from "../trpc";

export const instagramRouter = router({
  getPosts: publicProcedure.query(async () => {
    let urls: string[] = [];

    return urls;
  }),
});
