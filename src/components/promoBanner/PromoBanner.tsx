import { Fragment } from "react";
import { useAtom } from "jotai";
import { Transition } from "@headlessui/react";
import { showPromoAtom } from "../../atoms/index";
import Button from "../button/Button";

export default function PromoBanner() {
  const [showPromo, setShowPromo] = useAtom(showPromoAtom);

  return (
    <Transition
      show={showPromo}
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
              <span className="font-black">
                Crea tu cuenta y regala una GiftCard
              </span>{" "}
              de nuestros servicios.
            </span>
            <span className="block">Prueba visitar la nueva tienda online</span>
          </h2>
          <div className="flex flex-wrap gap-4 lg:flex-shrink-0">
            <Button small title="Visitar Tienda" />
            <Button small title="Iniciar Sesión" />
          </div>
        </div>
      </div>
    </Transition>
  );
}
