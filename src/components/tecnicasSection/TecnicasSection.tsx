import { useState, useEffect } from "react";
import ServiciosCard from "../serviciosCard/ServiciosCard";
import Link from "next/link";
import { shuffle } from "../../utils/util";
import { servicios as servRaw } from "../../utils/constants";

export default function TecnicasSection() {
  const [servicios, setServicios] = useState(servRaw);

  useEffect(() => {
    setServicios(shuffle(servicios));
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
        <h2 className="mb-6 text-center text-3xl font-black text-teal-900 lg:mb-12 lg:text-5xl">
          Algunos De Nuestros Servicios
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
          <ServiciosCard
            descripcion={servicios[0]?.descripcion ?? ""}
            nombre={servicios[0]?.nombre ?? ""}
            src={servicios[0]?.src ?? ""}
            alt={servicios[0]?.alt ?? ""}
            reverse
          />
          <ServiciosCard
            descripcion={servicios[1]?.descripcion ?? ""}
            nombre={servicios[1]?.nombre ?? ""}
            src={servicios[1]?.src ?? ""}
            alt={servicios[1]?.alt ?? ""}
          />
          <div className="flex w-full justify-end">
            <Link
              className="flex items-center justify-end gap-1"
              href="/servicios"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 stroke-teal-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
              <h3 className="text-lg font-black text-teal-600">
                Ver Mas Servicios
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
