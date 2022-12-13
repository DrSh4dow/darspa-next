import type { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import Stream from "stream";
import nodemailer from "nodemailer";

async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(`error converting stream - ${err}`));
  });
}

const transporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER,
  port: Number(env.EMAIL_PORT),
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

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

  const img = await QRCode.toDataURL(giftcard.data.url);

  const message = {
    from: env.EMAIL_FROM,
    to: session.user.email,
    attachDataUrls: true,
    subject: `Gift Card - ${giftcard.data.name}`,
    text: `Disfruta tu giftcard, Mostrando el siguiente código QR o Alfanumérico podrás hacer válida tu Giftcard: ${giftcard.data.authCode}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New message 2</title><!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {	padding:0;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:10px 30px 10px 30px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }</style></head>
<body data-new-gr-c-s-loaded="8.904.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA"><tr><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"><tr><td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;padding-bottom:20px;font-size:0px" align="center"><img src="https://images.prismic.io/darspa/8f52ffe2-dc73-4629-82ee-84cd8240482d_group-logo.png?auto=compress,format" alt="Logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;font-size:12px" title="Logo" width="100"></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr><td align="center" style="padding:0;Margin:0"><table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"><tr><td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px" align="center"><img class="adapt-img" src="https://images.prismic.io/darspa/78f68a95-589e-4e0e-a2d2-ceadb1e1769d_fotos+giftcarf.png?auto=compress,format" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="300"></td>
</tr><tr><td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:70px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:70px;font-style:normal;font-weight:bold;color:#333333">Disfruta tu Giftcard<br></h1></td></tr><tr><td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"><h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333">Gracias por elegirnos<br></h3></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#333333"></h3>
Mostrando el siguiente código QR o Alfanumérico podrás hacer válida tu Giftcard<br></td></tr></table></td></tr></table></td>
</tr><tr><td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-left:2px dashed #cccccc;border-right:2px dashed #cccccc;border-top:2px dashed #cccccc;border-bottom:2px dashed #cccccc;border-radius:5px" width="100%" cellspacing="0" cellpadding="0" role="presentation"><tr><td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Código</h2>
</td></tr><tr><td align="center"><img src="${img}"/></td></tr><tr><td class="es-m-txt-c" align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px"><h1 style="Margin:0;line-height:55px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#333333">${giftcard.data.authCode}<br></h1></td></tr></table></td></tr></table></td>
</tr><tr><td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td class="es-m-txt-c" align="center" style="Margin:0;padding-bottom:5px;padding-top:15px;padding-left:20px;padding-right:20px"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">¿Como Funciona?<br></h2></td></tr></table></td></tr></table></td>
</tr><tr><td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:194px" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr><td class="es-m-p0r es-m-p20b" align="center" style="padding:0;Margin:0;width:174px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;font-size:0px" align="center"><img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="45"></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Contacta a uno de nuestros funcionarios vía WhatsApp o presencial<br></p></td></tr></table></td><td class="es-hidden" style="padding:0;Margin:0;width:20px"></td></tr></table><!--[if mso]></td>
<td style="width:173px" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr><td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:173px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;font-size:0px" align="center"><img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="45"></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Coméntales que quieres canjear tu Giftcard</p></td></tr></table></td></tr></table><!--[if mso]></td><td style="width:20px"></td>
<td style="width:173px" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr><td align="center" style="padding:0;Margin:0;width:173px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;font-size:0px" align="center"><img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="45"></td>
</tr><tr><td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">¡Confirma tu hora, y disfruta de tus sesiones!</p></td></tr></table></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></td>
</tr></table><table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" cellspacing="0" cellpadding="0" align="center"><tr><td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0" align="center"><table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.facebook.com/darspa.cl" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Facebook" src="https://images.prismic.io/darspa/66340e7f-c6ea-465b-87b5-e037f6a5341c_facebook-logo-black.png?auto=compress,format" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
<td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://www.instagram.com/darspa.cl/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Instagram" src="https://images.prismic.io/darspa/4c2088fe-e83b-4ba8-b81d-a23f44cddd24_instagram-logo-black.png?auto=compress,format" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td></tr></table></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">Dar Spa © 2022.<br>+56 9 7227 5490<br></p>
<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#333333;font-size:12px">E. Sotomayor 576, Castro.<br><br></p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>`,
    amp: `<!DOCTYPE html><html ⚡4email data-css-strict> <head> <meta charset="utf-8"/> <style amp4email-boilerplate> body{visibility: hidden;}</style> <script async src="https://cdn.ampproject.org/v0.js"></script> <style amp-custom> .es-desk-hidden{display: none; float: left; overflow: hidden; width: 0; max-height: 0; line-height: 0;}body{width: 100%; font-family: arial, "helvetica neue", helvetica, sans-serif;}table{border-collapse: collapse; border-spacing: 0px;}table td, body, .es-wrapper{padding: 0; margin: 0;}.es-content, .es-header, .es-footer{table-layout: fixed; width: 100%;}p, hr{margin: 0;}h1, h2, h3, h4, h5{margin: 0; line-height: 120%; font-family: arial, "helvetica neue", helvetica, sans-serif;}.es-left{float: left;}.es-right{float: right;}.es-p5{padding: 5px;}.es-p5t{padding-top: 5px;}.es-p5b{padding-bottom: 5px;}.es-p5l{padding-left: 5px;}.es-p5r{padding-right: 5px;}.es-p10{padding: 10px;}.es-p10t{padding-top: 10px;}.es-p10b{padding-bottom: 10px;}.es-p10l{padding-left: 10px;}.es-p10r{padding-right: 10px;}.es-p15{padding: 15px;}.es-p15t{padding-top: 15px;}.es-p15b{padding-bottom: 15px;}.es-p15l{padding-left: 15px;}.es-p15r{padding-right: 15px;}.es-p20{padding: 20px;}.es-p20t{padding-top: 20px;}.es-p20b{padding-bottom: 20px;}.es-p20l{padding-left: 20px;}.es-p20r{padding-right: 20px;}.es-p25{padding: 25px;}.es-p25t{padding-top: 25px;}.es-p25b{padding-bottom: 25px;}.es-p25l{padding-left: 25px;}.es-p25r{padding-right: 25px;}.es-p30{padding: 30px;}.es-p30t{padding-top: 30px;}.es-p30b{padding-bottom: 30px;}.es-p30l{padding-left: 30px;}.es-p30r{padding-right: 30px;}.es-p35{padding: 35px;}.es-p35t{padding-top: 35px;}.es-p35b{padding-bottom: 35px;}.es-p35l{padding-left: 35px;}.es-p35r{padding-right: 35px;}.es-p40{padding: 40px;}.es-p40t{padding-top: 40px;}.es-p40b{padding-bottom: 40px;}.es-p40l{padding-left: 40px;}.es-p40r{padding-right: 40px;}.es-menu td{border: 0;}s{text-decoration: line-through;}p, ul li, ol li{font-family: arial, "helvetica neue", helvetica, sans-serif; line-height: 150%;}ul li, ol li{margin-bottom: 15px; margin-left: 0;}a{text-decoration: underline;}.es-menu td a{text-decoration: none; display: block; font-family: arial, "helvetica neue", helvetica, sans-serif;}.es-menu amp-img, .es-button amp-img{vertical-align: middle;}.es-wrapper{width: 100%; height: 100%;}.es-wrapper-color, .es-wrapper{background-color: #fafafa;}.es-header{background-color: transparent;}.es-header-body{background-color: transparent;}.es-header-body p, .es-header-body ul li, .es-header-body ol li{color: #333333; font-size: 14px;}.es-header-body a{color: #666666; font-size: 14px;}.es-content-body{background-color: #ffffff;}.es-content-body p, .es-content-body ul li, .es-content-body ol li{color: #333333; font-size: 14px;}.es-content-body a{color: #5c68e2; font-size: 14px;}.es-footer{background-color: transparent;}.es-footer-body{background-color: #ffffff;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li{color: #333333; font-size: 12px;}.es-footer-body a{color: #333333; font-size: 12px;}.es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li{line-height: 120%; font-size: 12px; color: #cccccc;}.es-infoblock a{font-size: 12px; color: #cccccc;}h1{font-size: 46px; font-style: normal; font-weight: bold; color: #333333;}h2{font-size: 26px; font-style: normal; font-weight: bold; color: #333333;}h3{font-size: 20px; font-style: normal; font-weight: bold; color: #333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a{font-size: 46px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a{font-size: 26px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a{font-size: 20px;}a.es-button, button.es-button{border-style: solid; border-color: #5c68e2; border-width: 10px 30px 10px 30px; display: inline-block; background: #5c68e2; border-radius: 5px; font-size: 20px; font-family: arial, "helvetica neue", helvetica, sans-serif; font-weight: normal; font-style: normal; line-height: 120%; color: #ffffff; text-decoration: none; width: auto; text-align: center;}.es-button-border{border-style: solid solid solid solid; border-color: #2cb543 #2cb543 #2cb543 #2cb543; background: #5c68e2; border-width: 0px 0px 0px 0px; display: inline-block; border-radius: 5px; width: auto;}body{font-family: arial, "helvetica neue", helvetica, sans-serif;}@media only screen and (max-width: 600px){p, ul li, ol li, a{line-height: 150%;}h1, h2, h3, h1 a, h2 a, h3 a{line-height: 120%;}h1{font-size: 36px; text-align: left;}h2{font-size: 26px; text-align: left;}h3{font-size: 20px; text-align: left;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a{font-size: 36px; text-align: left;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a{font-size: 26px; text-align: left;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a{font-size: 20px; text-align: left;}.es-menu td a{font-size: 12px;}.es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a{font-size: 14px;}.es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a{font-size: 14px;}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a{font-size: 14px;}.es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a{font-size: 12px;}*[class="gmail-fix"]{display: none;}.es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3{text-align: center;}.es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3{text-align: right;}.es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3{text-align: left;}.es-m-txt-r amp-img{float: right;}.es-m-txt-c amp-img{margin: 0 auto;}.es-m-txt-l amp-img{float: left;}.es-button-border{display: inline-block;}a.es-button, button.es-button{font-size: 20px; display: inline-block;}.es-adaptive table, .es-left, .es-right{width: 100%;}.es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header{width: 100%; max-width: 600px;}.es-adapt-td{display: block; width: 100%;}.adapt-img{width: 100%; height: auto;}td.es-m-p0{padding: 0;}td.es-m-p0r{padding-right: 0;}td.es-m-p0l{padding-left: 0;}td.es-m-p0t{padding-top: 0;}td.es-m-p0b{padding-bottom: 0;}td.es-m-p20b{padding-bottom: 20px;}.es-mobile-hidden, .es-hidden{display: none;}tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden{width: auto; overflow: visible; float: none; max-height: inherit; line-height: inherit;}tr.es-desk-hidden{display: table-row;}table.es-desk-hidden{display: table;}td.es-desk-menu-hidden{display: table-cell;}.es-menu td{width: 1%;}table.es-table-not-adapt, .esd-block-html table{width: auto;}table.es-social{display: inline-block;}table.es-social td{display: inline-block;}td.es-m-p5{padding: 5px;}td.es-m-p5t{padding-top: 5px;}td.es-m-p5b{padding-bottom: 5px;}td.es-m-p5r{padding-right: 5px;}td.es-m-p5l{padding-left: 5px;}td.es-m-p10{padding: 10px;}td.es-m-p10t{padding-top: 10px;}td.es-m-p10b{padding-bottom: 10px;}td.es-m-p10r{padding-right: 10px;}td.es-m-p10l{padding-left: 10px;}td.es-m-p15{padding: 15px;}td.es-m-p15t{padding-top: 15px;}td.es-m-p15b{padding-bottom: 15px;}td.es-m-p15r{padding-right: 15px;}td.es-m-p15l{padding-left: 15px;}td.es-m-p20{padding: 20px;}td.es-m-p20t{padding-top: 20px;}td.es-m-p20r{padding-right: 20px;}td.es-m-p20l{padding-left: 20px;}td.es-m-p25{padding: 25px;}td.es-m-p25t{padding-top: 25px;}td.es-m-p25b{padding-bottom: 25px;}td.es-m-p25r{padding-right: 25px;}td.es-m-p25l{padding-left: 25px;}td.es-m-p30{padding: 30px;}td.es-m-p30t{padding-top: 30px;}td.es-m-p30b{padding-bottom: 30px;}td.es-m-p30r{padding-right: 30px;}td.es-m-p30l{padding-left: 30px;}td.es-m-p35{padding: 35px;}td.es-m-p35t{padding-top: 35px;}td.es-m-p35b{padding-bottom: 35px;}td.es-m-p35r{padding-right: 35px;}td.es-m-p35l{padding-left: 35px;}td.es-m-p40{padding: 40px;}td.es-m-p40t{padding-top: 40px;}td.es-m-p40b{padding-bottom: 40px;}td.es-m-p40r{padding-right: 40px;}td.es-m-p40l{padding-left: 40px;}.es-desk-hidden{display: table-row; width: auto; overflow: visible; max-height: inherit;}}</style> </head> <body data-new-gr-c-s-loaded="8.904.0"> <div class="es-wrapper-color"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background ><![endif]--> <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"> <tr> <td valign="top"> <table class="es-header" cellspacing="0" cellpadding="0" align="center" > <tr> <td align="center"> <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="rgba(0, 0, 0, 0)" align="center" > <tr> <td class="es-p10t es-p10b es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td class="es-m-p0r" width="560" valign="top" align="center" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td class="es-p20b" style="font-size: 0px" align="center" > <amp-img src="https://images.prismic.io/darspa/8f52ffe2-dc73-4629-82ee-84cd8240482d_group-logo.png?auto=compress,format" alt="Logo" style="display: block; font-size: 12px" title="Logo" width="100" height="100" ></amp-img> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table class="es-content" cellspacing="0" cellpadding="0" align="center" > <tr> <td align="center"> <table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" > <tr> <td class="es-p20t es-p10b es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td width="560" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td class="es-p10t es-p10b" style="font-size: 0px" align="center" > <amp-img class="adapt-img" src="https://images.prismic.io/darspa/78f68a95-589e-4e0e-a2d2-ceadb1e1769d_fotos+giftcarf.png?auto=compress,format" alt style="display: block" width="300" height="300" layout="responsive" ></amp-img> </td></tr><tr> <td class="es-p10b es-m-txt-c" align="center"> <h1 style="font-size: 70px; line-height: 70px" > Disfruta tu Giftcard<br/> </h1> </td></tr><tr> <td class="es-p20t es-p10b es-m-txt-c" align="center" > <h3 style="line-height: 100%"> Gracias por elegirnos<br/> </h3> </td></tr><tr> <td class="es-p5t es-p5b" align="center"> <h3></h3> Mostrando el siguiente código o el código QR o Alfanumerico adjunto podrás hacer válida tu Giftcard<br/> </td></tr></table> </td></tr></table> </td></tr><tr> <td class="es-p10t es-p10b es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td width="560" valign="top" align="center"> <table style=" border-left: 2px dashed #cccccc; border-right: 2px dashed #cccccc; border-top: 2px dashed #cccccc; border-bottom: 2px dashed #cccccc; border-radius: 5px; border-collapse: separate; " width="100%" cellspacing="0" cellpadding="0" role="presentation" ><tr><td align="center"><img src="${img}"/></td></tr> <tr> <td class="es-p20t es-p20r es-p20l es-m-txt-c" align="center" > <h2>Código</h2> </td></tr><tr> <td class="es-p10t es-p20b es-p20r es-p20l es-m-txt-c" align="center" > <h1>${giftcard.data.authCode}<br/></h1> </td></tr></table> </td></tr></table> </td></tr><tr> <td class="es-p20t es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td width="560" valign="top" align="center"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td class="es-p15t es-p5b es-p20r es-p20l es-m-txt-c" align="center" > <h2>¿Como Funciona?<br/></h2> </td></tr></table> </td></tr></table> </td></tr><tr> <td class="es-p20" align="left"> <table class="es-left" cellspacing="0" cellpadding="0" align="left" > <tr> <td class="es-m-p0r es-m-p20b" width="174" align="center" > <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td style="font-size: 0px" align="center"> <amp-img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display: block" width="45" height="49" ></amp-img> </td></tr><tr> <td class="es-p10t es-p10b" align="center"> <p> Contacta a uno de nuestros funcionarios vía WhatsApp o presencial<br/> </p></td></tr></table> </td><td class="es-hidden" width="20"></td></tr></table> <table class="es-left" cellspacing="0" cellpadding="0" align="left" > <tr> <td class="es-m-p20b" width="173" align="center"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td style="font-size: 0px" align="center"> <amp-img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display: block" width="45" height="49" ></amp-img> </td></tr><tr> <td class="es-p10t es-p10b" align="center"> <p> Coméntales que quieres canjear tu Giftcard </p></td></tr></table> </td></tr></table><!--[if mso]></td><td width="20"></td><td width="173" valign="top"><![endif]--> <table class="es-right" cellspacing="0" cellpadding="0" align="right" > <tr> <td width="173" align="center"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td style="font-size: 0px" align="center"> <amp-img src="https://images.prismic.io/darspa/ef3912b3-64f1-4a5e-a5e3-810c29d35942_2851617878322771.png?auto=compress,format" alt style="display: block" width="45" height="49" ></amp-img> </td></tr><tr> <td class="es-p10t es-p10b" align="center"> <p> ¡Confirma tu hora, y disfruta de tus sesiones! </p></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> <table class="es-footer" cellspacing="0" cellpadding="0" align="center" > <tr> <td align="center"> <table class="es-footer-body" style="background-color: transparent" width="640" cellspacing="0" cellpadding="0" align="center" > <tr> <td class="es-p20t es-p20b es-p20r es-p20l" align="left"> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td width="600" align="left"> <table width="100%" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td class="es-p15t es-p15b" style="font-size: 0" align="center" > <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" > <tr> <td class="es-p40r" valign="top" align="center" > <a target="_blank" href="https://www.facebook.com/darspa.cl" ><amp-img title="Facebook" src="https://images.prismic.io/darspa/66340e7f-c6ea-465b-87b5-e037f6a5341c_facebook-logo-black.png?auto=compress,format" alt="Fb" width="32" height="32" ></amp-img ></a> </td><td valign="top" align="center"> <a target="_blank" href="https://www.instagram.com/darspa.cl/" ><amp-img title="Instagram" src="https://images.prismic.io/darspa/4c2088fe-e83b-4ba8-b81d-a23f44cddd24_instagram-logo-black.png?auto=compress,format" alt="Inst" width="32" height="32" ></amp-img ></a> </td></tr></table> </td></tr><tr> <td class="es-p35b" align="center"> <p> Dar Spa © 2022.<br/>+56 9 7227 5490<br/> </p><p>E. Sotomayor 576, Castro.<br/><br/></p></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </div></body></html>`,
  };

  try {
    console.log("SENDING MAIL GIFTCARD");
    transporter.sendMail(message, (error) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "unexpected error" });
      }

      return res.status(200).json({ success: true, message: "success" });
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "unexpected error" });
  }
};

export default sendGiftcardEmail;
