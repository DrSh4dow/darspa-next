import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/hero/Hero";
import NovedadesSection from "../components/novedadesSection/NovedadesSection";
import SobreNosotrosSection from "../components/sobreNosotrosSection/SobreNosotrosSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dar Spa | Centro Nutricional Avanzado</title>
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
      <Hero />
      <NovedadesSection />
      <SobreNosotrosSection />
    </>
  );
};

export default Home;
