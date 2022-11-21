import Button from "../button/Button";
export default function CTA() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto max-w-screen-2xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="font-montserrat text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
          <span className="block">Listo para iniciar tu cambio?</span>
          <span className="block text-2xl text-teal-500 sm:text-3xl">
            Agenda tu hora.
          </span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-4 lg:mt-0 lg:flex-shrink-0">
          <Button title="Agendar Hora" />
        </div>
      </div>
    </div>
  );
}
