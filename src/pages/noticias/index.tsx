import { type NextPage } from "next";
import Head from "next/head";
import NoticiaCard from "../../components/noticiaCard/NoticiaCard";
import { months } from "../../utils/constants";
import { prismicClient as client } from "../../utils/prismic";

const Noticias: NextPage<{
  filteredNoticias: {
    titulo: string;
    cuerpo: string;
    imagenSrc: string;
    date: string;
  }[];
}> = ({ filteredNoticias }) => {
  return (
    <>
      <Head>
        <title>Dar Spa | Noticias & Novedades</title>
        <meta name="description" content="Feed de noticias de Dar Spa" />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl/noticias" />
      </Head>
      <section>
        <div className="mx-auto max-w-screen-2xl py-20 px-2 sm:px-4">
          <h1 className="mb-4 text-3xl font-black text-teal-900 lg:mb-6 lg:text-5xl">
            Ultimas Noticias, Notificaciones,
            <br />
            Ofertas, y Actualizaciones
            <br />
            Sobre DarSpa
          </h1>
          <h3 className="mb-20 text-sm text-slate-600 md:text-base">
            Archivo de las ultimas noticias ordenado cronologicamente para que
            pueda enterarse de las novedades
          </h3>
          <div className="md:border-l md:border-slate-100 md:pl-6 ">
            <div className="flex max-w-3xl flex-col space-y-16">
              {filteredNoticias.map((noticia) => {
                return (
                  <NoticiaCard
                    cuerpo={noticia.cuerpo}
                    date={noticia.date}
                    tituloNoticia={noticia.titulo}
                    key={noticia.date + noticia.titulo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const noticias = await client.getAllByType("noticia", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  const filteredNoticias = noticias.map(({ data, first_publication_date }) => {
    const [year, month, day] = first_publication_date
      .split("T")[0]
      ?.split("-") ?? ["", "", ""];
    const formatedMonth = months[Number(month) - 1];

    return {
      titulo: data.titulo[0].text ?? "Titulo",
      cuerpo: data.cuerpo[0].text ?? "",
      date: `${day} de ${formatedMonth}, ${year}`,
    };
  });

  return {
    props: {
      filteredNoticias,
    },
  };
}

export default Noticias;
