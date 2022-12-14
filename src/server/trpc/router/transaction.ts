import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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
  getUserSales: protectedProcedure.query(async ({ ctx }) => {
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
      const sales = user.Transactions.flatMap((t) => {
        return t.sales.map((s) => {
          return {
            servicio: s.productPrismicName,
            precio: s.total,
            cobrado: s.isReady,
            fecha: s.createdAt,
            authCode: s.authCode,
          };
        });
      }).sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
      return sales;
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "user does not exist",
        cause: "user does not exist",
      });
    }
  }),
});
