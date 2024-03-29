import { type NextPage } from "next";
import { z } from "zod";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { shoppingCartContent } from "../../../atoms";
import Head from "next/head";
import ConfirmacionCard from "../../../components/confirmacionCard/ConfirmacionCard";
import { useEffect } from "react";

const Confirmacion: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const setShoppingCart = useAtom(shoppingCartContent)[1];

  const status = z
    .enum(["aborted", "completed", "failed"])
    .safeParse(router.query.status);

  useEffect(() => {
    setShoppingCart([]);
  }, []);

  if (!session) {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Denegado</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <h1 className="my-40 text-center text-3xl font-bold text-slate-800 ">
          Acceso Denegado, Debe{" "}
          <span
            onClick={() => {
              signIn();
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            iniciar sesion
          </span>
        </h1>
      </>
    );
  }

  if (!status.success) {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Denegado</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <h1 className="my-40 text-center text-3xl font-bold text-slate-800 ">
          Parametros Incorrectos
        </h1>
      </>
    );
  }

  if (status.data === "aborted") {
    return (
      <>
        <Head>
          <title>Dar Spa | Pago Abortado</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <ConfirmacionCard status={status.data} />
      </>
    );
  }

  if (status.data === "failed") {
    const errorCode = z
      .number()
      .negative()
      .safeParse(Number(router.query.response_code));
    if (!errorCode.success) {
      return (
        <>
          <Head>
            <title>Dar Spa | Accesso Denegado</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <h1 className="my-40 text-center text-3xl font-bold text-slate-800 ">
            Parametros Incorrectos
          </h1>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>Dar Spa | Pago Fallido</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <ConfirmacionCard
            status={status.data}
            responseCode={errorCode.data}
          />
        </>
      );
    }
  }

  const transactionId = z.string().safeParse(router.query.transaction_id);
  if (!transactionId.success) {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Denegado</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <h1 className="my-40 text-center text-3xl font-bold text-slate-800 ">
          Parametros Incorrectos
        </h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dar Spa | Pago Exitoso</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ConfirmacionCard
        status={status.data}
        transactionId={transactionId.data}
      />
    </>
  );
};

export default Confirmacion;
