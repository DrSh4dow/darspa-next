import { useEffect, useState } from "react";

export default function NoticiaCard({
  tituloNoticia = "Titulo de Noticia",
  cuerpo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum integer dignissim euismod adipiscing dignissim sit...",
  date = "2022-08-04",
}: {
  tituloNoticia: string;
  cuerpo: string;
  date: string;
}) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="group relative flex flex-col items-start md:col-span-3">
        <h2 className="text-base font-semibold tracking-tight text-teal-900 ">
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-slate-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></div>
          <div className="inline">
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
          {date}
        </time>
        <p className="relative z-10 mt-2 text-sm text-slate-600 ">{cuerpo}</p>
      </div>
      <time className="relative z-10 order-first mt-1 mb-3 flex hidden items-center text-sm text-slate-400 md:block">
        {date}
      </time>
    </article>
  );
}
