import { type NextPage } from "next";
import Head from "next/head";
import ServiciosCard from "../../components/serviciosCard/ServiciosCard";
import { servicios } from "../../utils/constants";

const Servicios: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dar Spa | Servicios & Tecnicas</title>
        <meta
          name="description"
          content="Somos un conjunto de profesionales, técnicos y 
                   administrativos dedicados a dar respuesta integral a 
                   algunos de los problemas emergentes mas importantes del 
                   tiempo moderno, la falta de alimentación mas saludable, el
                   incremento de obesidad, la perdida de la autoestima y 
                   el deporte como estilo de vida."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section>
        <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
          <h1 className="mb-2 text-center text-3xl font-black text-teal-900 lg:text-5xl">
            Servicios, Terapias, & Prestaciones
          </h1>
          <p className="mb-10 text-center text-sm font-bold text-slate-600 lg:mb-24">
            Contamos con multiples servicios y terapias que te ayudaran a
            conseguir la mejor version de ti! <br />
            Ven, te contamos un poco sobre ellas.
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
            <h2 className="mb-2 text-left text-2xl font-black text-teal-900 lg:text-4xl">
              Modelado Corporal
            </h2>
            {servicios
              .filter((s) => s.tipo === "modeladoCorporal")
              .map((s, idx) => (
                <ServiciosCard
                  src={s.src}
                  nombre={s.nombre}
                  descripcion={s.descripcion}
                  alt={s.alt}
                  key={s.nombre}
                  reverse={idx % 2 === 0}
                />
              ))}
            <h2 className="mb-2 mt-10 text-left text-2xl font-black text-teal-900 lg:mt-20 lg:text-4xl">
              Tratamientos Faciales
            </h2>
            {servicios
              .filter((s) => s.tipo === "tratamientoFacial")
              .map((s, idx) => (
                <ServiciosCard
                  src={s.src}
                  nombre={s.nombre}
                  descripcion={s.descripcion}
                  alt={s.alt}
                  key={s.nombre}
                  reverse={idx % 2 === 0}
                />
              ))}
            <h2 className="mb-2 mt-10 text-left text-2xl font-black text-teal-900 lg:mt-20 lg:text-4xl">
              Masajes
            </h2>
            {servicios
              .filter((s) => s.tipo === "masaje")
              .map((s, idx) => (
                <ServiciosCard
                  src={s.src}
                  nombre={s.nombre}
                  descripcion={s.descripcion}
                  alt={s.alt}
                  key={s.nombre}
                  reverse={idx % 2 === 0}
                />
              ))}
            <h2 className="mb-2 mt-10 text-left text-2xl font-black text-teal-900 lg:mt-20 lg:text-4xl">
              Otros Servicios
            </h2>
            {servicios
              .filter((s) => s.tipo === "otros")
              .map((s, idx) => (
                <ServiciosCard
                  src={s.src}
                  nombre={s.nombre}
                  descripcion={s.descripcion}
                  alt={s.alt}
                  key={s.nombre}
                  reverse={idx % 2 === 0}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicios;
