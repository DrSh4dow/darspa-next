import type { NextApiRequest, NextApiResponse } from "next";
import { examenUserSchema } from "../../../env/schema.mjs";
import { z } from "zod";
import {
  imagenLaboratorioOne,
  imagenLaboratorioTwo,
  imagenEstudioMetabolico,
} from "../../../utils/constants";
import PDFDocument from "pdfkit";
import { sendEmail } from "./sendMail";

const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function genPdf(paciente: z.infer<typeof examenUserSchema>) {
  return new Promise<Buffer>((resolve) => {
    const now = new Date();
    const currentIsoDate = now.toISOString();
    const formatedFecha = `${
      currentIsoDate.split("T")[0]?.split("-")[2] ?? ""
    }-${months[Number(currentIsoDate.split("T")[0]?.split("-")[1]) - 1]}-${
      currentIsoDate.split("T")[0]?.split("-")[0]
    }`;

    const laborat =
      paciente.cirugia || paciente.diabetes
        ? imagenLaboratorioTwo
        : imagenLaboratorioOne;

    // Inicializacion del pdf
    const doc = new PDFDocument({
      size: "letter",
    });

    // pipe the document to a blob
    const buffers: any = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      resolve(pdfData);
    });

    //Metadata del documento
    doc.info.Author = "Daniel Moretti";
    doc.info.Title = "Ordenes de Examen";
    doc.info.Creator = "Daniel Moretti";

    //Contenido
    //orden metabolica
    doc.image(imagenEstudioMetabolico, 0, 0, { width: 612.0, height: 792.0 });
    doc.fontSize(11).text(paciente.nombreCompleto, 144, 144);
    doc.fontSize(11).text(paciente.rut, 144, 159);
    doc.fontSize(11).text(paciente.edad + " años", 144, 174);
    doc.fontSize(11).text(paciente.direccion, 144, 188);
    doc.fontSize(11).text(formatedFecha, 274, 707);

    //examen de laboratorio
    doc.addPage();
    doc.image(laborat, 0, 0, { width: 612.0, height: 792.0 });
    doc.fontSize(11).text(paciente.nombreCompleto, 144, 144);
    doc.fontSize(11).text(paciente.rut, 144, 159);
    doc.fontSize(11).text(paciente.edad + " años", 144, 174);
    doc.fontSize(11).text(paciente.direccion, 144, 188);
    doc.fontSize(11).text(formatedFecha, 274, 707);

    doc.end();
  });
}

const generateExamenOrden = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // Data parsing and validation
  let parsedUser;
  try {
    parsedUser = examenUserSchema.parse(req.body);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "Datos con formato invalido", email: false });
    return;
  }

  const pdfData = await genPdf(parsedUser);

  if (parsedUser.byEmail) {
    await sendEmail(parsedUser, pdfData);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=orden-examen.pdf");

  res.status(200).send(pdfData);
};

export default generateExamenOrden;
