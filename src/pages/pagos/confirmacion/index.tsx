import { type NextPage } from "next";
import { z } from "zod";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const Confirmacion: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const status = z
    .enum(["aborted", "completed", "failed"])
    .safeParse(router.query.status);

  if (!session) {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Denegado</title>
          <meta
            name="description"
            content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://darspa.cl/servicios" />
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
          <meta
            name="description"
            content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://darspa.cl/servicios" />
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
          <meta
            name="description"
            content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://darspa.cl/servicios" />
        </Head>
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
            <meta
              name="description"
              content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
            />
            <link rel="icon" href="/favicon.png" />
            <link rel="canonical" href="https://darspa.cl/servicios" />
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
            <meta
              name="description"
              content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
            />
            <link rel="icon" href="/favicon.png" />
            <link rel="canonical" href="https://darspa.cl/servicios" />
          </Head>
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
          <meta
            name="description"
            content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://darspa.cl/servicios" />
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
        <meta
          name="description"
          content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl/servicios" />
      </Head>
    </>
  );
};

export default Confirmacion;
