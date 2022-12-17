import { router, publicProcedure } from "../trpc";
import { prismicClient } from "../../../utils/prismic";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const generalRouter = router({
  getGiftcardBackgrounds: publicProcedure.query(async () => {
    let filteredBackgrounds;
    try {
      const backgrounds = await prismicClient.getAllByType("giftcard_template");
      filteredBackgrounds = backgrounds
        .filter((b) => b.data.active)
        .map((b) => ({
          id: b.id,
          src: z.string().parse(b.data.background.url),
        }));
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "server error",
        cause: "server error",
      });
    }

    return filteredBackgrounds;
  }),
});
