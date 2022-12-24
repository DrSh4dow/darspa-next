import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  getAllSales: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
        cause: "Forbidden",
      });
    } else {
      // user is admin
      let transactions;
      try {
        transactions = await prisma.transaction.findMany({
          include: {
            sales: true,
            user: true,
          },
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "bad request",
          cause: "bad request",
        });
      }

      return transactions.flatMap((t) =>
        t.sales.map((s) => ({
          servicio: s.productPrismicName,
          precio: s.total,
          cobrado: s.isReady,
          fecha: s.createdAt,
          usuario: t.user.email,
          id: s.id,
        }))
      );
    }
  }),

  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
        cause: "Forbidden",
      });
    } else {
      // user is admin
      let users;
      try {
        users = await prisma.user.findMany();
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "bad request",
          cause: "bad request",
        });
      }

      return users.map((u) => ({ name: u.name, email: u.email, id: u.id }));
    }
  }),
});
