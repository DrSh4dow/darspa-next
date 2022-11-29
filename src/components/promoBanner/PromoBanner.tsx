import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import Button from "../button/Button";
import { useInView } from "react-intersection-observer";

export default function PromoBanner() {
  const { ref, inView } = useInView();
  return (
    <>
      <div ref={ref} className="absolute top-0 left-0 -z-50 h-[80vh] w-full" />
      <Transition
        show={!inView}
        as={Fragment}
        enter="transition-transform duration-500"
        enterFrom="translate-y-16"
        enterTo="translate-y-0"
        leave="transition-transform duration-500"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-16"
      >
        <div
          className={`sticky  bottom-0 z-10 h-16 w-full 
       bg-white shadow-2xl `}
        >
          <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center px-6 md:justify-between">
            <h2 className="hidden font-montserrat text-sm font-bold tracking-tight text-teal-900 md:block">
              <span className="block">
                Crea tu cuenta y regala una GiftCard de nuestros servicios.
              </span>
              <span className="block">
                Prueba visitar la nueva tienda online
              </span>
            </h2>
            <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
              <Button small title="Visitar Tienda" />
              <Button
                backgroundClassName="bg-blue-500"
                hoverColor="hover:bg-blue-400"
                small
                title="Iniciar Sesión"
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}
