import type { NextApiRequest, NextApiResponse } from "next";
import { examenUserSchema } from "../../../env/schema.mjs";
import {
  imagenLaboratorioOne,
  imagenLaboratorioTwo,
  imagenEstudioMetabolico,
} from "../../../utils/constants";
import { env } from "../../../env/server.mjs";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

const transporter = nodemailer.createTransport({
  host: "mail.darspa.cl",
  port: 587,
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

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

async function genPdf(rawUser: any, res: NextApiResponse) {
  const paciente = examenUserSchema.parse(rawUser);

  const now = new Date();
  const currentIsoDate = now.toISOString();
  const formatedFecha = `${currentIsoDate.split("T")[0]?.split("-")[2] ?? ""}-${
    months[Number(currentIsoDate.split("T")[0]?.split("-")[1]) - 1]
  }-${currentIsoDate.split("T")[0]?.split("-")[0]}`;

  console.log(formatedFecha);

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
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    if (paciente.byEmail) {
      sendEmail(paciente, pdfData);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=orden-examen.pdf"
    );
    res.status(200).send(pdfData);
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
}

async function sendEmail(user: any, pdfBlob: Buffer) {
  const parsedUser = examenUserSchema.parse(user);
  const message = {
    from: "noreply@darspa.cl",
    to: parsedUser.correoElectronico,
    subject: `Orden de Examen - ${parsedUser.nombreCompleto}`,
    text: `Se ha generado una orden de examen para ${parsedUser.nombreCompleto} desde la pagina web, se le adjunta la orden lista para ser impresa a continuacion.


ATTE. 
-Equipo DarSpa.`,
    html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>New email template 2022-11-24</title><!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"><!--<![endif]-->
<style type="text/css">
.rollover:hover .rollover-first {
max-height:0px!important;
display:none!important;
}
.rollover:hover .rollover-second {
max-height:none!important;
display:block!important;
}
#outlook a {
padding:0;
}
.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
.es-button-border:hover {
border-style:solid solid solid solid!important;
background:#0b317e!important;
border-color:#42d159 #42d159 #42d159 #42d159!important;
}
.es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
background:#0b317e!important;
border-color:#0b317e!important;
}
[data-ogsb] .es-button {
border-width:0!important;
padding:10px 20px 10px 20px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .st-br { padding-left:10px!important; padding-right:10px!important } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } h2 a { text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } h3 a { text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
</style>
</head>
<body data-new-gr-c-s-loaded="8.904.0" style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#F8F9FD"><!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f8f9fd"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F8F9FD">
<tr>
<td valign="top" style="padding:0;Margin:0">
<table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td align="left" style="Margin:0;padding-top:10px;padding-bottom:15px;padding-left:30px;padding-right:30px">
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td valign="top" align="center" style="padding:0;Margin:0;width:540px">
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td style="padding:0;Margin:0;font-size:0px" align="center"><img src="https://images.prismic.io/darspa/8f52ffe2-dc73-4629-82ee-84cd8240482d_group-logo.png?auto=compress,format" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="130"></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
<tr>
<td style="padding:0;Margin:0;background-color:#ffffff" bgcolor="#ffffff" align="center">
<table class="es-content-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td style="padding:0;Margin:0;padding-left:30px;padding-right:30px;padding-top:40px;background-position:left bottom;background-color:#ffffff" bgcolor="#ffffff" align="left">
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td valign="top" align="center" style="padding:0;Margin:0;width:540px">
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#212121">Orden De Examen — DarSpa</h1></td>
</tr>
<tr>
<td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#131313;font-size:16px">Se ha generado una orden de examen para ${parsedUser.nombreCompleto} desde la pagina web de DarSpa<br>se le adjunta la orden lista para ser impresa al pie de pagina.</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
</div>
</body>
</html>
`,
    amp: `<!doctype html><html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>.es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0;}.es-button-border:hover { border-style:solid solid solid solid; background:#0B317E; border-color:#42D159 #42D159 #42D159 #42D159;}.es-button-border:hover a.es-button, .es-button-border:hover button.es-button { background:#0B317E; border-color:#0B317E;}body { width:100%; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif;}table { border-collapse:collapse; border-spacing:0px;}table td, body, .es-wrapper { padding:0; Margin:0;}.es-content, .es-header, .es-footer { table-layout:fixed; width:100%;}p, hr { Margin:0;}h1, h2, h3, h4, h5 { Margin:0; line-height:120%; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif;}.es-left { float:left;}.es-right { float:right;}.es-p5 { padding:5px;}.es-p5t { padding-top:5px;}.es-p5b { padding-bottom:5px;}.es-p5l { padding-left:5px;}.es-p5r { padding-right:5px;}.es-p10 { padding:10px;}.es-p10t { padding-top:10px;}.es-p10b { padding-bottom:10px;}.es-p10l { padding-left:10px;}.es-p10r { padding-right:10px;}.es-p15 { padding:15px;}.es-p15t { padding-top:15px;}.es-p15b { padding-bottom:15px;}.es-p15l { padding-left:15px;}.es-p15r { padding-right:15px;}.es-p20 { padding:20px;}.es-p20t { padding-top:20px;}.es-p20b { padding-bottom:20px;}.es-p20l { padding-left:20px;}.es-p20r { padding-right:20px;}.es-p25 { padding:25px;}.es-p25t { padding-top:25px;}.es-p25b { padding-bottom:25px;}.es-p25l { padding-left:25px;}.es-p25r { padding-right:25px;}.es-p30 { padding:30px;}.es-p30t { padding-top:30px;}.es-p30b { padding-bottom:30px;}.es-p30l { padding-left:30px;}.es-p30r { padding-right:30px;}.es-p35 { padding:35px;}.es-p35t { padding-top:35px;}.es-p35b { padding-bottom:35px;}.es-p35l { padding-left:35px;}.es-p35r { padding-right:35px;}.es-p40 { padding:40px;}.es-p40t { padding-top:40px;}.es-p40b { padding-bottom:40px;}.es-p40l { padding-left:40px;}.es-p40r { padding-right:40px;}.es-menu td { border:0;}s { text-decoration:line-through;}p, ul li, ol li { font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; line-height:150%;}ul li, ol li { Margin-bottom:15px; margin-left:0;}a { text-decoration:underline;}.es-menu td a { text-decoration:none; display:block; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif;}.es-menu amp-img, .es-button amp-img { vertical-align:middle;}.es-wrapper { width:100%; height:100%;}.es-wrapper-color, .es-wrapper { background-color:#F8F9FD;}.es-header { background-color:transparent;}.es-header-body { background-color:transparent;}.es-header-body p, .es-header-body ul li, .es-header-body ol li { color:#333333; font-size:14px;}.es-header-body a { color:#1376C8; font-size:14px;}.es-content-body { background-color:transparent;}.es-content-body p, .es-content-body ul li, .es-content-body ol li { color:#131313; font-size:16px;}.es-content-body a { color:#2CB543; font-size:16px;}.es-footer { background-color:#0A2B6E; background-image:url(https://yoqbem.stripocdn.email/content/guids/CABINET_9bfedeeeb9eeabe76f8ff794c5e228f9/images/2191625641866113.png); background-repeat:repeat; background-position:center center;}.es-footer-body { background-color:transparent;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li { color:#212121; font-size:16px;}.es-footer-body a { color:#FFFFFF; font-size:16px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li { line-height:120%; font-size:12px; color:#FFFFFF;}.es-infoblock a { font-size:12px; color:#FFFFFF;}h1 { font-size:30px; font-style:normal; font-weight:bold; color:#212121;}h2 { font-size:24px; font-style:normal; font-weight:bold; color:#212121;}h3 { font-size:20px; font-style:normal; font-weight:normal; color:#212121;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px;}a.es-button, button.es-button { border-style:solid; border-color:#071F4F; border-width:10px 20px 10px 20px; display:inline-block; background:#071F4F; border-radius:5px; font-size:16px; font-family:roboto, "helvetica neue", helvetica, arial, sans-serif; font-weight:normal; font-style:normal; line-height:120%; color:#FFFFFF; text-decoration:none; width:auto; text-align:center;}.es-button-border { border-style:solid solid solid solid; border-color:#2CB543 #2CB543 #2CB543 #2CB543; background:#071F4F; border-width:0px 0px 0px 0px; display:inline-block; border-radius:5px; width:auto;}.es-button img { display:inline-block; vertical-align:middle;}.es-p-default { padding-top:20px; padding-right:20px; padding-bottom:0px; padding-left:20px;}.es-p-all-default { padding:0px;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px; text-align:center } h2 { font-size:26px; text-align:center } h3 { font-size:20px; text-align:center } .st-br { padding-left:10px; padding-right:10px } h1 a { text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px } h2 a { text-align:center } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px } h3 a { text-align:center } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:block } a.es-button, button.es-button { font-size:16px; display:block; border-left-width:0px; border-right-width:0px } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0 } td.es-m-p0r { padding-right:0 } td.es-m-p0l { padding-left:0 } td.es-m-p0t { padding-top:0 } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } td.es-m-p5 { padding:5px } td.es-m-p5t { padding-top:5px } td.es-m-p5b { padding-bottom:5px } td.es-m-p5r { padding-right:5px } td.es-m-p5l { padding-left:5px } td.es-m-p10 { padding:10px } td.es-m-p10t { padding-top:10px } td.es-m-p10b { padding-bottom:10px } td.es-m-p10r { padding-right:10px } td.es-m-p10l { padding-left:10px } td.es-m-p15 { padding:15px } td.es-m-p15t { padding-top:15px } td.es-m-p15b { padding-bottom:15px } td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p20 { padding:20px } td.es-m-p20t { padding-top:20px } td.es-m-p20r { padding-right:20px } td.es-m-p20l { padding-left:20px } td.es-m-p25 { padding:25px } td.es-m-p25t { padding-top:25px } td.es-m-p25b { padding-bottom:25px } td.es-m-p25r { padding-right:25px } td.es-m-p25l { padding-left:25px } td.es-m-p30 { padding:30px } td.es-m-p30t { padding-top:30px } td.es-m-p30b { padding-bottom:30px } td.es-m-p30r { padding-right:30px } td.es-m-p30l { padding-left:30px } td.es-m-p35 { padding:35px } td.es-m-p35t { padding-top:35px } td.es-m-p35b { padding-bottom:35px } td.es-m-p35r { padding-right:35px } td.es-m-p35l { padding-left:35px } td.es-m-p40 { padding:40px } td.es-m-p40t { padding-top:40px } td.es-m-p40b { padding-bottom:40px } td.es-m-p40r { padding-right:40px } td.es-m-p40l { padding-left:40px } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }</style></head>
<body data-new-gr-c-s-loaded="8.904.0"><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f8f9fd"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table class="es-header" cellspacing="0" cellpadding="0" align="center"><tr><td align="center"><table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr><td class="es-p10t es-p15b es-p30r es-p30l" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="540" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="font-size: 0px" align="center"><amp-img src="https://images.prismic.io/darspa/8f52ffe2-dc73-4629-82ee-84cd8240482d_group-logo.png?auto=compress,format" alt style="display: block" width="130" height="130"></amp-img></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tr><td style="background-color: #ffffff" bgcolor="#ffffff" align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" align="center"><tr><td class="es-p40t es-p30r es-p30l" style="background-color: #ffffff" bgcolor="#ffffff" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tr><td width="540" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td class="es-p10b es-m-txt-c" align="center"><h1>Orden De Examen — DarSpa</h1></td></tr><tr><td class="es-p5b es-m-txt-c" align="left"><p style="line-height: 150%">Se ha generado una orden de examen para ${parsedUser.nombreCompleto} desde la pagina web de DarSpa</p><p style="line-height: 150%;text-align: center">se le adjunta la orden lista para ser impresa al pie de pagina.<br></p>
</td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
`,
    attachments: [
      {
        filename: "orden-examen.pdf",
        content: pdfBlob,
        contentType: "application/pdf",
      },
    ],
  };

  let res;
  try {
    console.log("SENDING MAIL");
    res = await transporter.sendMail(message);
  } catch (e) {
    console.log(e);
    return false;
  }

  if (res.accepted.length > 0) {
    return true;
  } else {
    return false;
  }
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

  genPdf(parsedUser, res);
};

export default generateExamenOrden;
