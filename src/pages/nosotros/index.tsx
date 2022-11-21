import { type NextPage } from "next";
import Head from "next/head";
import TeamCard from "../../components/teamCard/TeamCard";

const Nosotros: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dar Spa | Nuestro Equipo</title>
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
          <h1 className="mb-10 text-3xl font-black text-teal-900 lg:mb-20 lg:text-5xl">
            Sobre Nosotros
          </h1>
          <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mb-40 lg:gap-24">
            <div>
              <h3 className="mb-1 text-2xl font-bold text-teal-700">
                ¿Quienes Somos?
              </h3>
              <p className="leading-snug text-slate-900">
                Somos un conjunto de profesionales, técnicos y administrativos
                dedicados a dar respuesta integral a algunos de los problemas
                emergentes mas importantes del tiempo moderno, la falta de
                alimentación mas saludable, el incremento de obesidad, la
                perdida de la autoestima y el deporte como estilo de vida.
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-2xl font-bold text-teal-700">
                ¿Por que somos Diferentes?
              </h3>
              <p className="leading-snug text-slate-900">
                En DarSpa creemos en los detalles, en cada pequeña acción, desde
                el aroma que sientes al entrar hasta el calor de la chimenea.
                Una sonrisa amable y atención de calidad humana, no solo
                técnica, y si se necesita la mirada de algún otro integrante ten
                por seguro que te atenderá tan bien como el anterior. Nosotros
                disfrutamos nuestro trabajo y nos encanta lo que hacemos. Te
                invitamos a ser parte de la experiencia DarSpa, notarás la
                diferencia!!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-100">
        <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
          <h1 className="mb-10 text-2xl font-black text-teal-900 lg:mb-20 lg:text-4xl">
            Conoce a Nuestro Equipo
          </h1>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 [&:not(:focus-visible)]:focus:outline-none">
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
