import Image from "next/image";

export default function ServiciosCard() {
  return (
    <article className="relative flex flex-wrap-reverse items-center justify-center gap-4 rounded-3xl border-4 border-teal-700 p-4 md:flex-nowrap md:justify-between md:gap-6 md:rounded-tl-[140px] md:rounded-bl-[140px] md:p-0">
      <div className="h-56 w-56 flex-shrink-0 flex-grow-0 overflow-hidden rounded-full border-4 border-teal-700 bg-teal-700 sm:h-[264px] sm:w-[260px] md:absolute md:-left-1">
        <Image
          src="/images/stones.png"
          alt="servicios dar spa"
          className="h-full w-full object-cover"
          width={264}
          height={264}
        />
      </div>
      <div className="hidden h-64 w-64 flex-shrink-0 flex-grow-0 rounded-full border-4 md:invisible md:block"></div>
      <div className="md:p-4">
        <h2 className="mb-4 font-montserrat text-2xl font-bold text-teal-900">
          HIFU Corporal
        </h2>
        <p className="text-base font-bold text-slate-800">
          Ultrasonido focalizado de alta intensidad cuyo mecanismo de accion es
          aumentar la temperatura de las capas mas internas de la piel de forma
          controlada e indolora. lo cual hace que el cuerpo genere más colageno.
          Esto ayuda a tratar la flacidez, logrando una piel mas firme y lisa
          con una apariencia muy natural en distintas zonas del cuerpo, como por
          ejemplo, abdomen y brazos.
        </p>
      </div>
    </article>
  );
}
