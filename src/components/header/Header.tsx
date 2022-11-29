import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logoHeader from "../../../public/images/logo-header.png";
import Drawer from "../drawer/Drawer";
import { useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import AccountMenuIcon from "../accountMenuIcon/AccountMenuIcon";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed z-40 h-14 w-full bg-slate-50 shadow-sm shadow-slate-600/40">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-2 sm:px-4">
        <div
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center justify-start gap-1 rounded-3xl border border-teal-600 py-1 px-3 md:hidden"
        >
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <h3 className="text-sm font-bold text-teal-600">Menu</h3>
        </div>
        <nav className="hidden items-center justify-between gap-4 text-2xl font-bold text-teal-600 transition-colors duration-300 md:flex ">
          <Link
            href="/"
            className={
              router.pathname === "/" ? "text-blue-700" : "hover:text-teal-700"
            }
          >
            Inicio
          </Link>
          <Link
            href="/noticias"
            className={
              router.pathname.startsWith("/noticias")
                ? "text-blue-700"
                : "hover:text-teal-700"
            }
          >
            Noticias
          </Link>
          <Link
            href="/nosotros"
            className={
              router.pathname.startsWith("/nosotros")
                ? "text-blue-700"
                : "hover:text-teal-700"
            }
          >
            Nosotros
          </Link>
          <Link
            href="/servicios"
            className={
              router.pathname.startsWith("/servicios")
                ? "text-blue-700"
                : "hover:text-teal-700"
            }
          >
            Servicios
          </Link>
          <Link
            href="/examenes"
            className={
              router.pathname.startsWith("/examenes")
                ? "text-blue-700"
                : "hover:text-teal-700"
            }
          >
            Examenes
          </Link>
        </nav>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Tooltip tooltip="Tienda">
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
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
          </Tooltip>
          <AccountMenuIcon />
          <Link href="/">
            <Image
              src={logoHeader}
              alt="dar spa, centro nutricional avanzado"
            />
          </Link>
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Menu">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={
            router.pathname === "/" ? "text-blue-700 " : "hover:text-teal-700"
          }
        >
          Inicio
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/noticias"
          className={
            router.pathname.startsWith("/noticias")
              ? "text-blue-700"
              : "hover:text-teal-700"
          }
        >
          Noticias
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/nosotros"
          className={
            router.pathname.startsWith("/nosotros")
              ? "text-blue-700"
              : "hover:text-teal-700"
          }
        >
          Nosotros
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/servicios"
          className={
            router.pathname.startsWith("/servicios")
              ? "text-blue-700"
              : "hover:text-teal-700"
          }
        >
          Servicios
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/examenes"
          className={
            router.pathname.startsWith("/examenes")
              ? "text-blue-700"
              : "hover:text-teal-700"
          }
        >
          Examenes
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/tienda"
          className={
            router.pathname.startsWith("/tienda")
              ? "text-blue-700"
              : "hover:text-teal-700"
          }
        >
          Tienda
        </Link>
      </Drawer>
    </header>
  );
}
