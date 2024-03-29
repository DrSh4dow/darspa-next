import { type NextPage } from "next";
import { examenes } from "../../utils/constants";
import Head from "next/head";
import ServiciosCard from "../../components/serviciosCard/ServiciosCard";

const Nosotros: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dar Spa | Examenes & Procedimientos</title>
        <meta
          name="description"
          content="En DarSpa realizamos multiples examenes para monitorear su progreso hacia la mejor version de usted mismo"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl/examenes" />
      </Head>
      <section>
        <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
          <h1 className="mb-2 text-center text-3xl font-black text-teal-900 lg:text-5xl">
            Nuestros Examenes & Procedimientos
          </h1>
          <p className="mb-10 text-center text-sm font-bold text-slate-600 lg:mb-24">
            Conoce los examenes con los que nuestro centro cuenta!
            <br />
            Ven, te contamos un poco sobre ellos.
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
            {examenes.map((e, idx) => (
              <ServiciosCard
                reverse={idx % 2 === 0}
                src={e.src}
                nombre={e.nombre}
                descripcion={e.descripcion}
                alt={e.alt}
                key={e.nombre}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
