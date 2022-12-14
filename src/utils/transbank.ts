import { WebpayPlus, Options, Environment } from "transbank-sdk";
import { env } from "../env/server.mjs";

export const tx = new WebpayPlus.Transaction(
  new Options(env.TX_API_KEY_ID, env.TX_API_KEY_SECRET, Environment.Production)
);
