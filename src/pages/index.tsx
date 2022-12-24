import { type NextPage, type GetStaticProps } from "next";
import Head from "next/head";
import Hero from "../components/hero/Hero";
import NovedadesSection from "../components/novedadesSection/NovedadesSection";
import SobreNosotrosSection from "../components/sobreNosotrosSection/SobreNosotrosSection";
import ComentariosSection from "../components/comentariosSection/ComentariosSection";
import TecnicasSection from "../components/tecnicasSection/TecnicasSection";
import FAQ from "../components/faq/FAQ";
import { env } from "../env/server.mjs";

const Home: NextPage<{ instagramPosts: string[] }> = ({ instagramPosts }) => {
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
        <link rel="canonical" href="https://darspa.cl" />
      </Head>
      <Hero instagramPosts={instagramPosts} />
      <NovedadesSection instagramPosts={instagramPosts} />
      <SobreNosotrosSection />
      <ComentariosSection />
      <TecnicasSection />
      <FAQ />
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  instagramPosts: string[];
}> = async () => {
  let urls: string[] = [];
  const instagramToken = env.INSTAGRAM_TOKEN;

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url&limit=10&access_token=${instagramToken}`
    );

    if (res.ok) {
      const data = await res.json();
      const resData: {
        id: string;
        media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
        media_url: string;
      }[] = data.data;

      let counter = 0;
      urls = resData.flatMap((p) => {
        if (p.media_type === "IMAGE" && counter < 4) {
          counter++;
          return p.media_url;
        } else {
          return [];
        }
      });
    }
  } catch (e) {
    console.log("some unexpected error occurred: ", e);
  }

  return {
    props: {
      instagramPosts: urls,
    },
    revalidate: 86400,
  };
};

export default Home;
