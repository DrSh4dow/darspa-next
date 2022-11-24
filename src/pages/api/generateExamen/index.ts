import type { NextApiRequest, NextApiResponse } from "next";
import { examenUserSchema } from "../../../env/schema.mjs";

async function genPdf() {}

async function sendEmail() {}

const generateExamenOrden = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Data parsing and validation
  let parsedResult = examenUserSchema.safeParse(req.body);
  if (parsedResult.success) {
    res.status(200).json({ message: "hello there" });
  } else {
    res.status(400).json({ message: "Datos con formato invalido" });
  }
};

export default generateExamenOrden;
