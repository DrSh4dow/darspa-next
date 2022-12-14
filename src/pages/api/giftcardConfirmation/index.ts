import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { z } from "zod";
import { prisma } from "../../../server/db/client";
import { addDays } from "../../../utils/util";

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

  const data = z
    .object({
      authCode: z.string(),
    })
    .safeParse(req.body);
  if (!data.success) {
    return res.status(200).json({ success: false, message: "datos invalidos" });
  }
  const { authCode } = data.data;

  // sale fetching
  let sale;
  try {
    sale = await prisma.sale.findUnique({
      where: {
        authCode: authCode,
      },
    });
    if (!sale) {
      return res
        .status(200)
        .json({ success: false, message: "No existe venta con ese codigo" });
    }
  } catch (e) {
    return res.status(200).json({ success: false, message: "error de prisma" });
  }

  // verify sale isReady
  if (sale.isReady) {
    return res.status(200).json({
      success: true,
      message: `La venta de ${sale.productPrismicName} ya se encuentra cobrada`,
    });
  }

  const currentDate = new Date();
  const expirationDate = addDays(sale.createdAt, 60);

  if (currentDate > expirationDate) {
    return res.status(200).json({
      success: false,
      message: "Fecha de expiracion alcanzada, no se pudo cobrar",
    });
  }

  // cobrar venta
  try {
    await prisma.sale.update({
      where: {
        id: sale.id,
      },
      data: {
        isReady: true,
      },
    });
  } catch (e) {
    return res.status(200).json({ success: false, message: "error de prisma" });
  }

  return res.status(200).json({
    success: true,
    message: `La venta de ${sale.productPrismicName} se cobro con exito!`,
  });
};

export default giftcardConfirmation;
