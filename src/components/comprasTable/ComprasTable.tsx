import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { formatter } from "../../utils/util";
import GiftCardModal from "../giftcardModal/GiftCardModal";

export default function ComprasTable() {
  const [sales, setSales] = useState<
    | {
        servicio: string;
        precio: number;
        cobrado: boolean;
        fecha: Date;
        authCode: string;
      }[]
    | []
  >([]);
  const transactionsQuery = trpc.transaction.getUserTransactions.useQuery();

  useEffect(() => {
    if (
      sales.length === 0 &&
      transactionsQuery.data &&
      transactionsQuery.data.data
    ) {
      setSales(
        transactionsQuery.data.data.flatMap((t) => {
          return t.sales.map((s) => {
            return {
              servicio: s.productPrismicName,
              precio: s.total,
              cobrado: s.isReady,
              fecha: s.createdAt,
              authCode: s.authCode,
            };
          });
        })
      );
    }
  }, [transactionsQuery]);

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Servicio
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha
            </th>
            <th scope="col" className="py-3 px-6">
              Precio
            </th>
            <th scope="col" className="py-3 px-6">
              Cobrado
            </th>
            <th scope="col" className="py-3 px-6">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            <>
              {sales.map((s) => (
                <tr key={s.authCode} className="border-b bg-white  ">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                  >
                    {s.servicio}
                  </th>
                  <td className="py-4 px-6">
                    {s.fecha.toLocaleString("es-CL", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6">{formatter.format(s.precio)}</td>
                  <td className="py-4 px-6">
                    {s.cobrado ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 stroke-teal-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    ) : (
                      <span>No</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <GiftCardModal
                      isRow
                      authCode={s.authCode}
                      name={s.servicio}
                    />
                  </td>
                </tr>
              ))}
            </>
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
        </tbody>
      </table>
    </div>
  );
}
