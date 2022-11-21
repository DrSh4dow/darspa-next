import Image from "next/image";
import stones from "../../../public/images/stones.png";

export default function TeamCard({}: {}) {
  return (
    <figure className="group cursor-pointer rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-8 flex items-center justify-center">
        <div className="h-56 w-56 overflow-hidden rounded-full">
          <Image
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={stones}
            alt="some random stones"
          />
        </div>
      </div>
      <h3 className="text-center font-montserrat text-xl font-bold text-teal-900">
        Daniel Moretti
      </h3>
      <h4 className="text-center font-montserrat text-base font-bold text-slate-400">
        Director Medico
      </h4>
    </figure>
  );
}
