import nodemailer from "nodemailer";
import { env } from "../env/server.mjs";

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER,
  port: Number(env.EMAIL_PORT),
  secure: false,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
