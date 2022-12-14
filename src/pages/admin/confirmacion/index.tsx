import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import QrScanner from "../../../components/qrScanner/QrScanner";

const ConfirmacionAdmin: NextPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
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

  if (session.user.role !== "ADMIN") {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Prohibido</title>
          <meta
            name="description"
            content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="canonical" href="https://darspa.cl/servicios" />
        </Head>
        <h1 className="my-40 text-center text-3xl font-bold text-slate-800 ">
          Acceso Denegado, No tiene permisos para acceder a esta pagina
        </h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dar Spa | Confirmar Giftcard</title>
        <meta
          name="description"
          content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl/servicios" />
      </Head>
      <AdminLayout
        title="Confirmacion"
        subtitle="Confirme via codigo qr o Alfanumerico"
      >
        <h3 className="mb-4 font-bold text-slate-600">
          Seleccione via de confirmacion:{" "}
        </h3>
        <div>
          <QrScanner />
        </div>
      </AdminLayout>
    </>
  );
};

export default ConfirmacionAdmin;
