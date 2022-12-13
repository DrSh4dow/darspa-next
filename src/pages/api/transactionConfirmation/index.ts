import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { z } from "zod";
import {
  transbankResponseSchema,
  dbProductsSchema,
} from "../../../env/schema.mjs";
import { tx } from "../../../utils/transbank";
import { prisma } from "../../../server/db/client";

const confirmTransaction = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // session verification
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).redirect("/pagos/confirmacion");
  }

  // transbank token parsing
  let token;
  try {
    if (req.query.token_ws) {
      token = z.string().parse(req.query.token_ws);
    } else {
      token = z.string().parse(req.query.TBK_TOKEN);
      const ordenCompra = z.string().parse(req.query.TBK_ORDEN_COMPRA);

      const transactionRecord = await prisma.transaction.findUnique({
        where: {
          id: ordenCompra,
        },
      });

      if (!transactionRecord) {
        throw new Error("Transaction record not found");
      }

      if (transactionRecord.userId !== session.user.id) {
        throw new Error("Transaction record does not belong to the user");
      }

      await prisma.transaction.update({
        where: {
          id: transactionRecord.id,
        },
        data: {
          state: "ABORTED",
          transbankResponse: {
            token,
          },
        },
      });

      return res.status(200).redirect("/pagos/confirmacion?status=aborted");
    }
  } catch (e) {
    console.log(e);
    return res.status(401).redirect("/pagos/confirmacion?status=aborted");
  }

  // check transaction status
  let response;
  try {
    const transbankRawResponse = await tx.commit(token);
    response = transbankResponseSchema.parse(transbankRawResponse);
  } catch (e) {
    console.log(e);
    return res.status(401).redirect("/pagos/confirmacion?status=aborted");
  }

  // update db transaction record with results
  const transaction = await prisma.transaction.update({
    where: {
      id: response.buy_order,
    },
    data: {
      transbankResponse: response,
      state: response.response_code === 0 ? "COMPLETED" : "FAILED",
    },
  });

  if (response.response_code !== 0) {
    return res
      .status(200)
      .redirect(
        `/pagos/confirmacion?status=failed&response_code=${response.response_code}`
      );
  } else {
    // create sales
    const products = dbProductsSchema.parse(transaction.products);
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        sales: {
          createMany: {
            data: products.items.map((p) => {
              return {
                productPrismicName: p.name,
                productPrismicId: p.id,
                total: p.price,
              };
            }),
          },
        },
      },
    });
    return res
      .status(200)
      .redirect(
        `/pagos/confirmacion?status=completed&transaction_id=${transaction.id}`
      );
  }
};

export default confirmTransaction;
