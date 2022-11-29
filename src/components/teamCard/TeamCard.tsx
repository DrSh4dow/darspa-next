import Image from "next/image";

export default function TeamCard({
  nombre,
  titulo,
  src,
}: {
  nombre: string;
  titulo: string;
  src: string;
}) {
  return (
    <figure className="group rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-8 flex items-center justify-center">
        <div className="h-56 w-56 overflow-hidden rounded-full border bg-red-50 shadow">
          <Image
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={src}
            draggable={false}
            height={320}
            width={320}
            alt="Profesional de DarSpa"
          />
        </div>
      </div>
      <h3 className="text-center font-montserrat text-xl font-bold text-teal-900">
        {nombre}
      </h3>
      <h4 className="text-center font-montserrat text-base font-bold text-slate-400">
        {titulo}
      </h4>
    </figure>
  );
}
