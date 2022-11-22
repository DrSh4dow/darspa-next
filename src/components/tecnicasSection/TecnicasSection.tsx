import { useState, useEffect } from "react";
import ServiciosCard from "../serviciosCard/ServiciosCard";

export default function TecnicasSection() {
  const [tecnicas, setTecnicas] = useState([]);

  useEffect(() => {}, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
        <h2 className="mb-6 text-center text-3xl font-black text-teal-900 lg:mb-12 lg:text-5xl">
          Algunos De Nuestros Servicios
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
          <ServiciosCard />
          <ServiciosCard />
        </div>
      </div>
    </section>
  );
}
