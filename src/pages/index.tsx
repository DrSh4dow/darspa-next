import { type NextPage } from "next";
import Head from "next/head";
import Hero from "../components/hero/Hero";
import NovedadesSection from "../components/novedadesSection/NovedadesSection";
import SobreNosotrosSection from "../components/sobreNosotrosSection/SobreNosotrosSection";
import ComentariosSection from "../components/comentariosSection/ComentariosSection";
import TecnicasSection from "../components/tecnicasSection/TecnicasSection";
import CTA from "../components/cta/CTA";
import FAQ from "../components/faq/FAQ";
import { env } from "../env/server.mjs";

// @ts-ignore
const Home: NextPage = ({ instagramPosts }) => {
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
      <Hero instagramPosts={instagramPosts} />
      <NovedadesSection />
      <SobreNosotrosSection />
      <ComentariosSection />
      <TecnicasSection />
      <FAQ />
      <CTA />
    </>
  );
};

export async function getStaticProps() {
  let urls: string[] = [];
  const instagramToken = env.INSTAGRAM_TOKEN;

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id&limit=4&access_token=${instagramToken}`
    );

    if (res.ok) {
      const data = await res.json();
      const idArray: { id: string }[] = data.data;
      for (let i = 0; i < idArray.length; i++) {
        const mediaRes = await fetch(
          `https://graph.instagram.com/${idArray[i]?.id}?fields=media_url&access_token=${instagramToken}`
        );
        if (mediaRes.ok) {
          const postRawData: { media_url: string } = await mediaRes.json();
          urls.push(postRawData.media_url);
        }
      }
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
}

export default Home;
