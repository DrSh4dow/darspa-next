import { useState, useEffect } from "react";
import TecnicasCard from "../tecnicasCard/TecnicasCard";

export default function TecnicasSection() {
  const [tecnicas, setTecnicas] = useState([]);

  useEffect(() => {}, []);

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
        <h2 className="mb-6 text-center text-3xl font-black text-teal-900 lg:mb-12 lg:text-5xl">
          Algunas De Nuestras Tecnicas
        </h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-10">
          <TecnicasCard />
          <TecnicasCard />
          <TecnicasCard />
        </div>
      </div>
    </section>
  );
}
