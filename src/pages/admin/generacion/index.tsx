import { type NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import AdminLayout from "../../../components/adminLayout/AdminLayout";
import Button from "../../../components/button/Button";
import { trpc } from "../../../utils/trpc";
import GiftCardModal from "../../../components/giftcardModal/GiftCardModal";
import { addDays } from "../../../utils/util";

type sale = {
  id: string;
  createdAt: Date;
  transactionId: string | null;
  productPrismicName: string;
  productPrismicId: string;
  total: number;
  authCode: string;
  isReady: boolean;
};

const GeneracionGiftcard: NextPage = () => {
  const { data: session } = useSession();
  const [selectedServicio, setSelectedServicio] = useState("null");
  const [giftcard, setGiftcard] = useState<sale | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const generacionMutation = trpc.admin.generateGiftcard.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      if (data) {
        setGiftcard(data);
      }
    },
    // onError: (err) => {},
    onSettled: () => {
      setIsLoading(false);
    },
  });
  const serviciosQuery = trpc.admin.getAllServices.useQuery();

  const handleSubmit = async () => {
    if (selectedServicio === "" || selectedServicio === "null") {
      return;
    }
    generacionMutation.mutate({ id: selectedServicio });
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
        <title>Dar Spa | Generar Giftcard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <AdminLayout
        title="Generar Gift Card"
        subtitle="Genere una Giftcard externa al sistema de ventas"
      >
        {serviciosQuery.data ? (
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
                  {serviciosQuery.data.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="w-full">
              <Button
                title={isLoading ? "Cargando..." : "Generar Giftcard"}
                disabled={isLoading || selectedServicio === "null"}
                onClick={handleSubmit}
              />
            </div>
            {giftcard && (
              <div className="w-full pt-6">
                <h2 className=" max-w-lg text-lg font-bold text-teal-700">
                  Giftcard generada con exito!
                </h2>
                <div className="max-w-md">
                  <GiftCardModal
                    authCode={giftcard.authCode}
                    name={giftcard.productPrismicName}
                    expirationDate={addDays(
                      giftcard.createdAt,
                      60
                    ).toLocaleDateString("es-CL")}
                    customMail
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            role="status"
            className="flex w-full items-center justify-center py-6"
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-12 w-12 animate-spin fill-blue-600 text-gray-200 "
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default GeneracionGiftcard;
