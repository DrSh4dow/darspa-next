import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { z } from "zod";
import { prisma } from "../../../server/db/client";

const giftcardConfirmation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // session verification
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res.status(401).redirect("/mi-cuenta");
  }

  if (session.user.role !== "ADMIN") {
    return res.status(403).redirect("/mi-cuenta");
  }

  return res.status(200).redirect("/tienda");
};

export default giftcardConfirmation;
