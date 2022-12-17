import {
  WebpayPlus,
  Options,
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
} from "transbank-sdk";
import { env } from "../env/server.mjs";

export const tx = new WebpayPlus.Transaction(
  process.env.NODE_ENV === "production"
    ? new Options(
        env.TX_API_KEY_ID,
        env.TX_API_KEY_SECRET,
        Environment.Production
      )
    : new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration
      )
);
