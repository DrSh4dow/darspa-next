import { Fragment, useRef, useState, SyntheticEvent } from "react";
import { useAtom } from "jotai";
import { loadingAtom } from "../../atoms/index";
import { Dialog, Transition } from "@headlessui/react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { validate as validateRut } from "rut.js";
type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [rut, setRut] = useState("");
  const [rutError, setRutError] = useState(false);
  const [edad, setEdad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [celular, setCelular] = useState("");
  const [diabetes, setDiabetes] = useState(false);
  const [cirugia, setCirugia] = useState(false);
  const [byEmail, setByEmail] = useState(false);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  const nombreRef = useRef(null);

  function validate() {
    if (!validateRut(rut)) {
      setRutError(true);
      return false;
    }

    setRutError(false);
    return true;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    let isAllValid = validate();

    if (!isAllValid) {
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      return;
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={nombreRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-2xl">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ListBulletIcon
                          className="h-6 w-6 text-teal-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-bold leading-6 text-teal-900"
                        >
                          Ingrese Sus Datos
                        </Dialog.Title>
                        <div className="mt-2 mb-6">
                          <p className="text-sm text-gray-500">
                            Ingrese sus datos a continuación para generar su
                            solicitud de exámenes, los cuales deberá realizar
                            previamente y luego presentar en su primera
                            consulta.
                          </p>
                        </div>
                        <div className="mb-4 grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="nombre-completo"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nombre completo
                            </label>
                            <input
                              type="text"
                              name="nombre-completo"
                              value={nombreCompleto}
                              required
                              onChange={(e) =>
                                setNombreCompleto(e.target.value)
                              }
                              id="nombre-completo"
                              autoComplete="given-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              ref={nombreRef}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="rut"
                              className="block text-sm font-medium text-gray-700"
                            >
                              RUT
                            </label>
                            <input
                              type="text"
                              name="rut"
                              id="rut"
                              required
                              value={rut}
                              onChange={(e) => setRut(e.target.value)}
                              autoComplete="family-name"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {rutError && (
                              <p className="text-sm font-bold text-red-600">
                                Debe ingresar un rut valido
                              </p>
                            )}
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="edad"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Edad
                            </label>
                            <input
                              type="number"
                              name="edad"
                              required
                              id="edad"
                              value={edad}
                              onChange={(e) => setEdad(e.target.value)}
                              autoComplete="age"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="direccion"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Dirección
                            </label>
                            <input
                              type="text"
                              name="direccion"
                              required
                              value={direccion}
                              onChange={(e) => setDireccion(e.target.value)}
                              id="direccion"
                              autoComplete="address"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Correo electronico
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={correoElectronico}
                              onChange={(e) =>
                                setCorreoElectronico(e.target.value)
                              }
                              id="email"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="celular"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Celular
                            </label>
                            <input
                              type="tel"
                              name="celular"
                              id="celular"
                              required
                              value={celular}
                              onChange={(e) => setCelular(e.target.value)}
                              autoComplete="tel"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <fieldset>
                          <legend className="sr-only">Opciones</legend>
                          <div
                            className="text-base font-medium text-gray-900"
                            aria-hidden="true"
                          >
                            Marcar en caso afirmativo
                          </div>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  id="diabetes"
                                  name="diabetes"
                                  type="checkbox"
                                  checked={diabetes}
                                  onChange={() => setDiabetes(!diabetes)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="diabetes"
                                  className="font-medium text-gray-700"
                                >
                                  Sufro de Diabetes
                                </label>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  id="cirugias"
                                  name="cirugias"
                                  type="checkbox"
                                  checked={cirugia}
                                  onChange={() => setCirugia(!cirugia)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="cirugias"
                                  className="font-medium text-gray-700"
                                >
                                  He sido sometido a una cirugía de control de
                                  peso en los últimos 3 años.
                                </label>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input
                                  id="porcorreo"
                                  name="porcorreo"
                                  type="checkbox"
                                  checked={byEmail}
                                  onChange={() => setByEmail(!byEmail)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="porcorreo"
                                  className="font-medium text-gray-700"
                                >
                                  Enviar PDF por correo electronico
                                </label>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`relative inline-flex w-full items-center justify-center rounded-md border border-transparent ${
                        isLoading
                          ? "bg-slate-300"
                          : "bg-teal-600 hover:bg-teal-700"
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
                      {isLoading ? "Cargando..." : "Generar e Imprimir"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
