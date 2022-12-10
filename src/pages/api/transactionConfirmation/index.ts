import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { z } from "zod";
import { transbankResponse } from "../../../env/schema.mjs";
import { tx } from "../../../utils/transbank";
import { prisma } from "../../../server/db/client";

const confirmTransaction = async (
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

  // transbank token parsing
  let token;
  try {
    token = z.string().parse(req.query.token_ws);
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .json({ success: false, message: "Solicitud malformada" });
  }

  console.log(token);
  // check transaction status
  let response;
  try {
    const transbankRawResponse = await tx.commit(token);
    response = transbankResponse.parse(transbankRawResponse);
  } catch (e) {
    console.log(e);
    return res
      .status(401)
      .json({ success: false, message: "Error de Transbank" });
  }

  // update db transaction record with results
  const transaction = await prisma.transaction.update({
    where: {
      id: response.buy_order,
    },
    data: {
      transbankResponse: response,
      state: response.response_code === 0 ? "COMPLETED" : "ABORTED",
    },
  });

  console.log(transaction);

  return res.status(200).json({ success: true, message: "you can be happy" });
};

export default confirmTransaction;
