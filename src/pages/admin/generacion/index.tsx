import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import Button from "../../../components/button/Button";
import { prismicClient } from "../../../utils/prismic";

const GeneracionGiftcard: NextPage<{
  filteredProductos: {
    name: string;
    price: number;
    id: string;
  }[];
}> = ({ filteredProductos }) => {
  const { data: session } = useSession();
  const [selectedServicio, setSelectedServicio] = useState("null");

  const handleSubmit = () => {
    console.log("hi");
  };

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
        title="Generar Gift Card"
        subtitle="Genere una Giftcard externa al sistema de ventas"
      >
        <div className="flex flex-wrap gap-2">
          <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Seleccione un Servicio:
              <select
                value={selectedServicio}
                onChange={(e) => setSelectedServicio(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              >
                <option value="null">Servicio</option>
                {filteredProductos.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-full">
            <Button
              title="Generar Giftcard"
              disabled={selectedServicio === "null"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export async function getServerSideProps() {
  const productos = await prismicClient.getAllByType("producto");
  const filteredProductos = productos
    .filter((p) => p.data.active)
    .map(({ data, id }) => {
      return {
        name: String(data.name[0].text),
        price: Number(data.price),
        id: id,
      };
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" })
    );

  return {
    props: {
      filteredProductos,
    },
  };
}

export default GeneracionGiftcard;
