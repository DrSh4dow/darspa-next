import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import ComprasTable from "../../components/comprasTable/ComprasTable";
import Head from "next/head";

const MiCuenta: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
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
    );
  }

  return (
    <>
      <Head>
        <title>Dar Spa | Mis Compras</title>
        <meta
          name="description"
          content="En DarSpa contamos con multiples tecnicas y servicios como botox, masoterapia, tecnicas de modelado corporal no invasivo, y modelado facial"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl/servicios" />
      </Head>
      <section className="mx-auto max-w-screen-xl py-20 px-2 sm:px-4">
        <h1 className="mb-10 text-left text-3xl font-black text-teal-900 lg:text-5xl">
          Mi Cuenta
        </h1>
        <div className="mb-40 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Mis Compras
            </h3>
            <p className="mt-1 mb-8 max-w-2xl text-sm text-gray-500">
              Información y detalles de sus compras.
            </p>
            <ComprasTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default MiCuenta;
