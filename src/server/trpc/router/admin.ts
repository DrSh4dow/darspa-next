import { router, protectedProcedure } from "../trpc";
import { prisma } from "../../db/client";
import { TRPCError } from "@trpc/server";
import { prismicClient } from "../../../utils/prismic";
import { z } from "zod";

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
          giftcardCode: s.authCode,
        }))
      );
    }
  }),
  getAllGeneratedSales: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
        cause: "Forbidden",
      });
    } else {
      // user is admin
      let sales;
      try {
        sales = await prisma.sale.findMany({
          where: {
            transaction: null,
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

      return sales;
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

  generateGiftcard: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Forbidden",
          cause: "Forbidden",
        });
      } else {
        const product = await prismicClient.getByID(input.id);
        console.log(product);

        try {
          const sale = await prisma.sale.create({
            data: {
              productPrismicId: input.id,
              productPrismicName: z.string().parse(product.data.name[0].text),
              total: z.number().parse(Number(product.data.price)),
            },
          });

          return sale;
        } catch (e) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "bad request",
            cause: "bad request",
          });
        }
      }
    }),

  getAllServices: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Forbidden",
        cause: "Forbidden",
      });
    } else {
      // user is admin;
      try {
        const productos = await prismicClient.getAllByType("producto");
        const filteredProductos = productos
          .filter((p) => p.data.active)
          .map(({ data, id }) => {
            return {
              name: String(data.name[0].text),
              price: Number(data.price),
              id: id,
            };
          })
          .sort((a, b) =>
            a.name.localeCompare(b.name, "es", { sensitivity: "base" })
          );

        return filteredProductos;
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "bad request",
          cause: "bad request",
        });
      }
    }
  }),
});
