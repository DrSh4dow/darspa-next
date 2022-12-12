import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

function AccountIcon() {
  const { data: session } = useSession();

  if (session && session.user && session.user.image) {
    return (
      <Image
        src={session.user.image}
        alt="profile pic"
        width={32}
        height={32}
        className="h-8 w-8 rounded-full border border-teal-500"
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 cursor-pointer stroke-teal-700"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export default function AccountMenuIcon() {
  const { data: session } = useSession();

  return (
    <Menu as="div" className="relative">
      <div className="flex h-full w-full items-center">
        <Menu.Button className="">
          <AccountIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {session && (
            <>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/mi-cuenta">
                      <button
                        className={`${
                          active ? "bg-teal-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Mis Compras
                      </button>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/tienda">
                      <button
                        className={`${
                          active ? "bg-teal-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Visitar Tienda
                      </button>
                    </Link>
                  )}
                </Menu.Item>
                {session.user?.role === "ADMIN" && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/admin">
                        <button
                          className={`${
                            active ? "bg-teal-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Administración
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? "bg-teal-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Cerrar Sesión
                    </button>
                  )}
                </Menu.Item>
              </div>
            </>
          )}
          {!session && (
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signIn()}
                    className={`${
                      active ? "bg-teal-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Iniciar Sesión
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-teal-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Visitar Tienda
                  </button>
                )}
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
