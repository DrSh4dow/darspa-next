import { Fragment } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { shoppingCartContent, shoppingCartOpen } from "../../atoms/index";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { formatter } from "../../utils/util";

export default function ShopQuickView({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: {
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    id: string;
  };
}) {
  const [shoppingCartProducts, setShoppingCartProducts] =
    useAtom(shoppingCartContent);
  const setShoppingCartOpen = useAtom(shoppingCartOpen)[1];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog open={open} as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden rounded-sm bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <Image
                        src={product?.imageSrc ?? "/images/stones.png"}
                        alt={product?.imageAlt ?? "Giftcard DarSpa"}
                        width={320}
                        height={320}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {product?.name ?? "Titulo"}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Informacion
                        </h3>
                        <p className="text-2xl text-gray-900">
                          {formatter.format(product?.price ?? 100000)}
                        </p>
                      </section>
                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <p>{product?.description}</p>
                        <button
                          onClick={() => {
                            if (
                              product &&
                              !(
                                shoppingCartProducts.filter(
                                  (p) => p.id === product.id
                                ).length > 0
                              )
                            ) {
                              setShoppingCartProducts([
                                ...shoppingCartProducts,
                                product,
                              ]);
                            }
                            setOpen(false);
                            setTimeout(() => setShoppingCartOpen(true), 500);
                          }}
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 py-3 px-8 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Agregar al Carrito
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
