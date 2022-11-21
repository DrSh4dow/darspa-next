export default function NoticiaCard({
  tituloNoticia = "Titulo de Noticia",
  cuerpo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum integer dignissim euismod adipiscing dignissim sit...",
  srcImagen = "/images/stones.png",
  date = "2022-08-04",
}: {
  tituloNoticia: string;
  cuerpo: string;
  srcImagen: string;
  date: string;
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="group relative flex flex-col items-start md:col-span-3">
        <h2 className="text-base font-semibold tracking-tight text-teal-900 ">
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-slate-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
          <div className="inline cursor-pointer">
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{tituloNoticia}</span>
          </div>
        </h2>
        <time className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-slate-400 md:hidden">
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <span className="h-4 w-0.5 rounded-full bg-slate-200 "></span>
          </span>
          Septiembre 5, 2022
        </time>
        <p className="relative z-10 mt-2 text-sm text-slate-600 ">{cuerpo}</p>
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
        >
          Leer Articulo
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="ml-1 h-4 w-4 stroke-current"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>
      <time className="relative z-10 order-first mt-1 mb-3 flex hidden items-center text-sm text-slate-400 md:block">
        Septiembre 5, 2022
      </time>
    </article>
  );
}
