import Image from "next/image";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../button/Button";

export default function InstagramPost({
  src = "/images/spin.gif",
  alt = "post de instagram",
}: {
  src?: string;
  alt?: string;
}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer rounded-lg bg-slate-50 p-4 shadow-md"
      >
        <div className="h-80 w-80 overflow-hidden lg:h-52 lg:w-52">
          <Image
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={320}
            height={320}
            src={src}
            alt={alt}
          />
        </div>
      </article>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="rounded-xl bg-white p-6 shadow sm:p-8 md:p-10">
                <Dialog.Title className="mb-6 text-xl font-black text-teal-900 sm:mb-8 lg:text-3xl">
                  Instagram Post
                </Dialog.Title>
                <div className="h-auto w-80 overflow-hidden rounded-lg sm:w-[512px]">
                  <Image
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={512}
                    height={512}
                    src={src}
                    alt={alt}
                  />
                </div>
                <div className="mt-10 flex items-center justify-center">
                  <Button title="Cerrar" onClick={() => setIsOpen(!isOpen)} />
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
