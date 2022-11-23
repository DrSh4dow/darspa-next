import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../button/Button";

type DrawerProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({
  title = "",
  children,
  isOpen,
  setIsOpen,
}: DrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto sm:hidden"
      >
        <div className="flex h-screen w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className={`z-50 flex w-full max-w-sm flex-col justify-between
                         overflow-hidden bg-slate-50 p-6 text-left align-middle
                         shadow-xl`}
            >
              <div>
                <Dialog.Title className="mb-6 text-3xl font-bold text-teal-800 md:text-4xl">
                  {title}
                </Dialog.Title>
                <div className="grid w-full grid-cols-1 items-center justify-center gap-4 text-center text-2xl font-bold text-teal-600 transition-colors duration-300">
                  {children}
                </div>
              </div>

              <div className="mt-10 self-center">
                <Button title="Cerrar" onClick={() => setIsOpen(!isOpen)} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
