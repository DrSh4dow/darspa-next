// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  INSTAGRAM_TOKEN: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_FROM: z.string(),
  EMAIL_SERVER: z.string(),
  EMAIL_PORT: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),
  TX_RETURN_URL: z.string().url(),
  TX_API_KEY_SECRET: z.string(),
  TX_API_KEY_ID: z.string(),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
  NEXT_PUBLIC_CURRENT_HOSTNAME: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  NEXT_PUBLIC_CURRENT_HOSTNAME: process.env.NEXT_PUBLIC_CURRENT_HOSTNAME,
};

export const examenUserSchema = z.object({
  nombreCompleto: z.string().min(1).max(80),
  rut: z.string().min(8).max(14),
  edad: z.string().min(1).max(3),
  direccion: z.string().min(1).max(240),
  correoElectronico: z.string(),
  diabetes: z.boolean(),
  cirugia: z.boolean(),
  byEmail: z.boolean(),
});

export const productsRequestSchema = z.array(z.string().min(1));
export const productTransactionSchema = z
  .object({
    name: z.string().min(1).max(240),
    price: z.number().positive(),
    id: z.string().min(1).max(240),
  })
  .array();
export const dbProductsSchema = z.object({
  items: productTransactionSchema,
});
export const transbankResponseSchema = z.object({
  vci: z.string(),
  amount: z.number(),
  status: z.string(),
  buy_order: z.string(),
  session_id: z.string(),
  card_detail: z
    .object({
      card_number: z.string(),
    })
    .optional(),
  accounting_date: z.string().optional(),
  transaction_date: z.string().optional(),
  authorization_code: z.string().optional(),
  payment_type_code: z.string().optional(),
  response_code: z.number(),
  installments_amount: z.number().optional(),
  installments_number: z.number().optional(),
  balance: z.number().optional(),
});
