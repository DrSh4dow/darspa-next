import Image from "next/image";

export default function ServiciosCard({
  reverse = false,
  nombre = "",
  descripcion = "",
  src = "/images/stones.png",
  alt = "servicios de calidad ofrecidos por DarSpa",
}: {
  reverse?: boolean;
  nombre: string;
  descripcion: string;
  src?: string;
  alt?: string;
}) {
  return (
    <article
      className={`relative flex flex-wrap-reverse items-center justify-center gap-4 rounded-3xl border-4 border-teal-700 p-4 md:flex-nowrap md:justify-between md:gap-6 ${
        reverse
          ? "md:rounded-tr-[140px] md:rounded-br-[140px]"
          : "md:rounded-tl-[140px] md:rounded-bl-[140px]"
      } md:p-0`}
    >
      <div
        className={`h-56 w-56 flex-shrink-0 flex-grow-0 overflow-hidden rounded-full border-4 border-teal-700 bg-teal-700 sm:h-[264px] sm:w-[260px] md:absolute 
                    ${reverse ? "md:-right-1" : "md:-left-1"}`}
      >
        <Image
          draggable={false}
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          width={264}
          height={264}
        />
      </div>
      <div
        className={`hidden h-64 w-64 flex-shrink-0 flex-grow-0 rounded-full border-4 md:invisible ${
          reverse ? "" : "md:block"
        }`}
      />
      <div className="md:p-4">
        <h2 className="mb-4 font-montserrat text-2xl font-bold text-teal-900">
          {nombre}
        </h2>
        <p className="text-base font-bold text-slate-800">{descripcion}</p>
      </div>
      <div
        className={`hidden h-64 w-64 flex-shrink-0 flex-grow-0 rounded-full border-4 md:invisible ${
          reverse ? "md:block" : ""
        }`}
      />
    </article>
  );
}
