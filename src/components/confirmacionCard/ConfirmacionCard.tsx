import Link from "next/link";
import { codigoRespuestaTransbank } from "../../utils/constants";
import Voucher from "../voucher/Voucher";

export default function ConfirmacionCard({
  status,
  responseCode,
  transactionId,
}: {
  status: "aborted" | "failed" | "completed";
  responseCode?: number;
  transactionId?: string;
}) {
  return (
    <section className="mx-auto max-w-4xl py-20">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid gap-6">
            {status === "aborted" && (
              <>
                <h1 className="text-2xl font-black text-teal-900 lg:text-3xl">
                  Su Pago fue Abortado con Exito!
                </h1>
                <h2 className="mb-10 text-sm font-bold text-slate-600">
                  Puede volver a{" "}
                  <Link href="/" className="text-blue-500 hover:underline">
                    inicio
                  </Link>{" "}
                  o{" "}
                  <Link
                    href="/tienda"
                    className="text-blue-500 hover:underline"
                  >
                    continuar comprando
                  </Link>
                </h2>
              </>
            )}
            {status === "failed" && responseCode && (
              <>
                <h1 className="text-2xl font-black text-teal-900 lg:text-3xl">
                  Ocurrio un error procesando su pago
                </h1>
                <h2 className="mb-4 text-sm font-bold text-slate-600">
                  Puede volver a{" "}
                  <Link href="/" className="text-blue-500 hover:underline">
                    inicio
                  </Link>{" "}
                  o{" "}
                  <Link
                    href="/tienda"
                    className="text-blue-500 hover:underline"
                  >
                    continuar comprando
                  </Link>
                </h2>
                <h5 className="mb-10 text-sm font-bold text-slate-700">
                  El codigo de respuesta especificado por transbank esta
                  asociado con el siguiente error:{" "}
                  <span className="text-red-500">
                    {codigoRespuestaTransbank.get(responseCode)}
                  </span>
                </h5>
              </>
            )}
            {status === "completed" && transactionId && (
              <>
                <h1 className="text-2xl font-black text-teal-900 lg:text-3xl">
                  Su compra fue realizada con exito!
                </h1>
                <h2 className="mb-2 text-sm font-bold text-slate-600">
                  A continuación se le muestran los detalles de su compra:
                </h2>
                <Voucher transactionId={transactionId} />
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <Link
            href="/"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Volver al Inicio
          </Link>
          {status === "completed" && (
            <Link
              href="/mi-cuenta"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Ir a Mis Compras
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
