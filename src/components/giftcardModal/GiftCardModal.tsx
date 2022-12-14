import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QRCodeSVG } from "qrcode.react";

export default function GiftCardModal({
  authCode,
  name,
  isRow = false,
  cobrado = false,
}: {
  authCode: string;
  name: string;
  isRow?: boolean;
  cobrado?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendToMail = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sendGiftcardEmail", {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          authCode,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isRow ? (
        <button
          onClick={() => setIsOpen(true)}
          disabled={cobrado}
          className={`font-medium  ${
            cobrado ? "text-slate-500" : "text-blue-600 hover:underline"
          } `}
        >
          Obtener GiftCard
        </button>
      ) : (
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-0 flex-1 items-center">
            <PaperClipIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span className="ml-2 w-0 flex-1 truncate">
              giftcard {name.trim()}
            </span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <span
              onClick={() => setIsOpen(true)}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              Obtener
            </span>
          </div>
        </li>
      )}
      <Transition show={isOpen} as={Fragment}>
        <Dialog className={"z-50"} onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Dialog.Panel className="overflow-hidden rounded-xl bg-white shadow ">
                <div className="h-full w-full p-6 sm:p-8 md:p-10">
                  <Dialog.Title className="mb-2 text-xl font-black text-teal-900 lg:text-3xl">
                    Gift Card
                  </Dialog.Title>
                  <h2 className="mb-4 max-w-lg text-sm font-bold text-slate-500">
                    Presentando el siguiente codigo QR o Codigo alfanumerico en
                    DarSpa podra hacer valida su GiftCard de &quot;
                    <span className="text-slate-600">{name}</span>&quot;
                  </h2>
                  <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-white py-4 shadow">
                    <QRCodeSVG value={authCode} />
                    <h5 className="w-full text-center text-base font-black tracking-wider text-slate-700">
                      {authCode}
                    </h5>
                  </div>
                </div>
                {success && (
                  <h5 className="px-6 py-1 text-right text-sm font-bold text-teal-600">
                    Correo Enviado con Exito!
                  </h5>
                )}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={handleSendToMail}
                    disabled={isLoading}
                    className={`relative inline-flex w-full items-center justify-center rounded-md border border-transparent ${
                      isLoading
                        ? "bg-slate-300"
                        : "bg-teal-500 hover:bg-teal-600"
                    }  px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                  >
                    {isLoading && (
                      <svg
                        role="status"
                        className="mr-2 inline h-4 w-4 animate-spin text-gray-200"
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
                          fill="#1C64F2"
                        />
                      </svg>
                    )}
                    {isLoading ? "Cargando..." : "Enviar a mi Correo"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
