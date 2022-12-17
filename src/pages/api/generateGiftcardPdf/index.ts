import axios from "axios";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import QRCode from "qrcode";
import { z } from "zod";
import PDFDocument from "pdfkit";
import type { NextApiRequest, NextApiResponse } from "next";
import { giftcardForeground } from "../../../utils/constants";
import { prismicClient } from "../../../utils/prismic";

const generateGiftcardPdf = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    return res
      .status(401)
      .json({ success: false, message: "Sin Autorización" });
  }
  // Data parsing and validation
  let input, background, qr;
  try {
    input = z
      .object({
        authCode: z.string().min(3),
        name: z.string().min(3),
        backgroundId: z.string().min(3),
        expirationDate: z.string().min(3),
      })
      .parse(req.body);

    const prismicData = await prismicClient.getByID(input.backgroundId);
    const backgroundSrc = z
      .string()
      .url()
      .parse(prismicData.data.background.url);
    background = await axios.get(backgroundSrc, {
      responseType: "arraybuffer",
    });

    qr = await QRCode.toBuffer(input.authCode);
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "Datos con formato invalido", success: false });
  }

  const doc = new PDFDocument({
    size: "A7",
    info: {
      Author: "Dar Spa",
      Creator: "Dar Spa",
      CreationDate: new Date(),
      Title: `Giftcard ${input.name}`,
    },
    font: "Courier-Bold",
    layout: "landscape",
    lang: "es",
  });

  const buffers: any = [];
  doc.on("data", buffers.push.bind(buffers));

  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    res
      .setHeader("Content-Type", "application/pdf")
      .setHeader("Content-Disposition", "attachment; filename=giftcard.pdf")
      .status(200)
      .send(pdfData);
  });

  //pdf body
  doc.image(background.data, 0, 0, { width: 297.64, height: 209.76 });
  doc.image(giftcardForeground, 0, 0, { width: 297.64, height: 209.76 });
  doc.image(qr, 11, 12, { width: 42, height: 42 });
  doc.fontSize(11).text(input.name, 80, 90, {
    width: 210,
    align: "center",
  });
  doc.fontSize(8).text(input.expirationDate, 210, doc.page.height - 14, {
    width: 100,
    height: 10,
  });

  doc.end();
};

export default generateGiftcardPdf;
