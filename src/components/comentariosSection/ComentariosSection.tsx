import ComentarioCard from "../comentarioCard/ComentarioCard";
import {
  smallComentarios,
  midComments,
  bigCommentarios,
} from "../../utils/constants";

export default function ComentariosSection() {
  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-screen-2xl py-10 px-2 sm:px-4">
        <h2 className="mb-2 text-center text-3xl font-black text-teal-900 lg:text-5xl">
          Cambia Tu Vida Con DarSpa
        </h2>
        <p className="text-center text-sm font-bold text-slate-600">
          Cientos de personas han conseguido cambios reales
        </p>
        <div className="relative grid h-[49rem] max-h-[60vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          <div className="force-gpu animate-marquee-normal space-y-8 py-4">
            {smallComentarios.map(({ name, comment }) => {
              return (
                <ComentarioCard
                  name={name}
                  comment={comment}
                  key={name + comment}
                />
              );
            })}
          </div>
          <div className="force-gpu hidden animate-marquee-slow space-y-8 py-4 md:block ">
            {midComments.map(({ name, comment }) => {
              return (
                <ComentarioCard
                  name={name}
                  comment={comment}
                  key={name + comment}
                />
              );
            })}
          </div>
          <div className="force-gpu hidden animate-marquee-fast space-y-8 py-4 lg:block">
            {bigCommentarios.map(({ name, comment }) => {
              return (
                <ComentarioCard
                  name={name}
                  comment={comment}
                  key={name + comment}
                />
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
        </div>
      </div>
      <style jsx>{`
        .force-gpu {
          -webkit-transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          transformation: translateZ(0);
          will-change: transform;
        }

        .animation-delay-safari {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
}
