import Button from "../button/Button";

export default function NoticiaCard({
  tituloNoticia = "Titulo de Noticia",
  cuerpo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum integer dignissim euismod adipiscing dignissim sit...",
  srcImagen = "/images/stones.png",
  date = "11-Abr-2022",
}: {
  tituloNoticia: string;
  cuerpo: string;
  srcImagen: string;
  date: string;
}) {
  return (
    <article className="grid max-w-xl grid-cols-2 gap-20 rounded-tr-sm rounded-tl-[40px] rounded-br-[40px] rounded-bl-sm bg-white p-6 shadow-sm shadow-slate-600/40">
      <div>
        <h5 className="text-xs font-black text-slate-400/80">{date}</h5>
        <h1 className="mb-4 text-2xl font-black text-slate-900">
          {tituloNoticia}
        </h1>
        <p className="mb-4 leading-tight">{cuerpo}</p>
        <Button small title="Seguir Leyendo" />
      </div>
      <img src={srcImagen} alt="imagen de la noticia" className="col-start-2" />
    </article>
  );
}
