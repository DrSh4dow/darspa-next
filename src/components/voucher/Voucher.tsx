import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { transbankResponse } from "../../env/schema.mjs";
import { formatter } from "../../utils/util";

// type txResponse = {
//   vci: string;
//   amount: number;
//   status: string;
//   buy_order: string;
//   session_id: string;
//   card_detail?: {
//     card_number: string;
//   };
//   accounting_date?: string;
//   transaction_date?: string;
//   authorization_code?: string;
//   payment_type_code?: string;
//   response_code: number;
//   installments_amount?: number;
//   installments_number?: number;
//   balance?: number;
// };

export default function Voucher({ transactionId }: { transactionId: string }) {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [lastNumbers, setLastNumbers] = useState("");
  const [authCode, setAuthCode] = useState("");
  const transactionQuery =
    trpc.transaction.getTransactionData.useQuery(transactionId);

  useEffect(() => {
    if (transactionQuery.data && transactionQuery.data.success) {
      const txParsed = transbankResponse.safeParse(
        transactionQuery.data.data?.transbankResponse
      );
      if (txParsed.success) {
        const d = txParsed.data.transaction_date
          ? new Date(txParsed.data.transaction_date)
          : new Date();

        setDate(
          d.toLocaleString("es-CL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        );

        setPrice(formatter.format(txParsed.data.amount));
        setLastNumbers(txParsed.data.card_detail?.card_number ?? "");
        setAuthCode(txParsed.data.authorization_code ?? "");
      }
    }
  }, [transactionQuery]);
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Detalles De Compra
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Datos personales de transaccion y GiftCards adjuntas a la compra.
        </p>
      </div>
      {transactionQuery.data &&
      transactionQuery.data.success &&
      transactionQuery.data.data ? (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Fecha</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {date}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {price}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Orden de Compra
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {transactionQuery.data.data.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Numero de tarjeta
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                ************{lastNumbers}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Codigo de Autorización
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {authCode}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Archivos Adjuntos
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 w-0 flex-1 truncate">
                        giftcard_presoterapia.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Descargar
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 w-0 flex-1 truncate">
                        giftcard_dermoabrasión.pdf
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Descargar
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <div role="status" className="flex items-center justify-center py-6">
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
    </div>
  );
}