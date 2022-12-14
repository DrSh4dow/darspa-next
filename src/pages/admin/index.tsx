import { type NextPage } from "next";
import Link from "next/link";
import AdminLayout from "../../components/adminLayout/AdminLayout";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";

const Admin: NextPage = () => {
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
        <title>Dar Spa | Administracion</title>
        <meta name="description" content="pagina de administracion" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AdminLayout
        title="Suite Administrativa"
        subtitle="Centro de control de compras, transacciones, y giftcards"
      >
        <nav className="w-full overflow-hidden rounded-lg border">
          <Link
            href="/admin/transacciones"
            className="flex h-12 w-full items-center bg-slate-50 px-4 font-black text-slate-700  hover:bg-slate-100"
          >
            Transacciones
          </Link>
          <Link
            href="/admin/usuarios"
            className="flex h-12 w-full items-center bg-white px-4 font-black text-slate-700  hover:bg-slate-100"
          >
            Usuarios
          </Link>
          <Link
            href="/admin/confirmacion"
            className="flex h-12 w-full items-center bg-slate-50 px-4 font-black text-slate-700  hover:bg-slate-100"
          >
            Confirmar Codigo
          </Link>
        </nav>
      </AdminLayout>
    </>
  );
};

export default Admin;
