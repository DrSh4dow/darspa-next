import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const transport = {
  host: env.EMAIL_SERVER,
  port: Number(env.EMAIL_PORT),
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
};

const sendGiftcardEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user || !session.user.email) {
    return res.status(401).redirect("/mi-cuenta");
  }

  // parameters parsing
  const giftcard = z
    .object({
      name: z.string(),
      url: z.string().url(),
      authCode: z.string(),
    })
    .safeParse(req.body);

  if (!giftcard.success) {
    return res.status(400).json({ success: false, message: "invalid data" });
  }

  return res.status(200).json({ success: true, message: "success" });
};

export default sendGiftcardEmail;
