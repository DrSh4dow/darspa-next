import { type NextPage } from "next";
import Head from "next/head";
import ServiciosCard from "../../components/serviciosCard/ServiciosCard";

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
          <h1 className="mb-10 text-center text-3xl font-black text-teal-900 lg:mb-20 lg:text-5xl">
            Servicios, Terapias, & Prestaciones
          </h1>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8">
            <ServiciosCard />
            <ServiciosCard />
            <ServiciosCard />
            <ServiciosCard />
            <ServiciosCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Servicios;
