import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import {
  productsRequestSchema,
  productTransactionSchema,
} from "../../../env/schema.mjs";
import { prisma } from "../../../server/db/client";
import { tx } from "../../../utils/transbank";
import { env } from "../../../env/server.mjs";
import { prismicClient } from "../../../utils/prismic";

const generateTransaction = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // session verification
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res
      .status(401)
      .json({ success: false, message: "Sin Autorización" });
  }

  // Data parsing and validation
  let parsedProducts;
  try {
    parsedProducts = productsRequestSchema.parse(req.body.data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ success: false, message: "Bad Request" });
  }

  // Get Products
  let filteredParsedProducts;
  try {
    const rawPrismicProducts = await prismicClient.getByIDs(parsedProducts);
    if (rawPrismicProducts.results.length === 0) {
      return res.status(500).json({ success: false, message: "Server Error" });
    }
    filteredParsedProducts = productTransactionSchema.parse(
      rawPrismicProducts.results
        .filter((p) => p.data.active)
        .map((p) => {
          return {
            name: String(p.data.name[0].text),
            price: Number(p.data.price),
            id: String(p.id),
          };
        })
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Prismic Error" });
  }

  const totalPrice = filteredParsedProducts
    .map((p) => p.price)
    .reduce((p, c) => p + c, 0);

  // Create DB record of transaction
  let prismaTransaction;
  try {
    prismaTransaction = await prisma.transaction.create({
      data: {
        amount: totalPrice,
        products: {
          items: filteredParsedProducts,
        },
        user: {
          connect: { id: session.user.id },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "DB Error" });
  }

  // Generate Transbank Transaction
  let response;
  try {
    response = await tx.create(
      prismaTransaction.id,
      prismaTransaction.sessionId,
      prismaTransaction.amount,
      env.TX_RETURN_URL
    );
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Transbank Error" });
  }

  return res
    .status(200)
    .json({ success: true, message: "transaccion iniciada", data: response });
};

export default generateTransaction;
