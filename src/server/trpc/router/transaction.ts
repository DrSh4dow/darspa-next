import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { z } from "zod";

export const transactionRouter = router({
  getTransactionData: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      let transaction;
      try {
        transaction = await prisma.transaction.findUnique({
          where: {
            id: input,
          },
          include: {
            sales: true,
          },
        });
        if (!transaction) {
          console.log("no transaction with id:", input);
          return { success: false };
        }
      } catch (e) {
        console.log(e);
        return { success: false };
      }

      if (transaction.userId !== ctx.session.user.id) {
        console.log("la transaccion no pertenece al usuario");
        return { success: false };
      }

      return { success: true, data: transaction };
    }),
  getUserTransactions: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Transactions: {
          include: {
            sales: true,
          },
        },
      },
    });

    if (user) {
      return { success: true, data: user.Transactions };
    } else {
      return { success: false };
    }
  }),
});
