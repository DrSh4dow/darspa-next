import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logoHeader from "../../../public/images/logo-header.png";
import Drawer from "../drawer/Drawer";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed z-40 h-14 w-full bg-slate-50 shadow-sm shadow-slate-600/40">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-2 sm:px-4">
        <div
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center justify-start gap-1 rounded-3xl border border-teal-600 py-1 px-3 sm:hidden"
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
        <nav className="hidden items-center justify-between gap-4 text-2xl font-bold text-teal-600 transition-colors duration-300 sm:flex lg:gap-6">
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
        <div>
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
            router.pathname === "/" ? "text-blue-700" : "hover:text-teal-700"
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
      </Drawer>
    </header>
  );
}
