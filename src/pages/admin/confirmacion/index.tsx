import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import QrScanner from "../../../components/qrScanner/QrScanner";
import AlfanumericConfirmation from "../../../components/alfanumericConfirmation/AlfanumericConfirmation";

const ConfirmacionAdmin: NextPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
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

  if (session.user.role !== "ADMIN") {
    return (
      <>
        <Head>
          <title>Dar Spa | Accesso Prohibido</title>
          <link rel="icon" href="/favicon.png" />
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
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AdminLayout
        title="Confirmacion"
        subtitle="Confirme via codigo qr o Alfanumerico"
      >
        <h3 className="mb-4 font-bold text-slate-600">
          Seleccione via de confirmacion:{" "}
        </h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-full">
            <QrScanner />
          </div>
          <div className="w-full">
            <AlfanumericConfirmation />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ConfirmacionAdmin;
