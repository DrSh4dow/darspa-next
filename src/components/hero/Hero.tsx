import Button from "../button/Button";
import InstagramPost from "../instagramPost/InstagramPost";

export default function Hero() {
  return (
    <section className="relative w-full shadow-sm shadow-slate-600/40">
      <div className="absolute -z-10 h-full w-full bg-slate-50/75 lg:hidden" />
      <img
        className="absolute right-0 top-0 -z-20 h-full sm:hidden"
        src="/images/woman-shape-small.png"
        alt="modelado corporal dar spa"
      />
      <img
        className="absolute right-0 top-0 -z-20 hidden h-full sm:block lg:hidden"
        src="/images/woman-shape-mid.png"
        alt="baja la barriga con dar spa"
      />
      <img
        className="absolute -z-20 hidden h-full w-full object-cover lg:block"
        src="/images/banner.png"
        alt="entrena cuerpo y mente de forma sana con Dar Spa"
      />
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 px-2 pt-20 pb-10 sm:gap-8 sm:px-4 sm:pt-32 lg:grid-cols-2 lg:pt-10 lg:pb-20">
        <div className="hidden overflow-hidden pb-20 lg:block">
          <img
            src="/images/group-logo.png"
            alt="logo de dar spa clinica estetica de modelado corporal"
          />
        </div>
        <div className="lg:hidden">
          <h1 className="mb-1 font-montserrat text-4xl font-bold text-gray-900 sm:text-5xl">
            Clínica <br className="sm:hidden" />
            Dar Spa
          </h1>
          <h2 className="font-montserrat text-xl font-bold text-teal-600 sm:text-2xl">
            Modelado Corporal <br />
            No Invasivo
          </h2>
        </div>
        <div className="col-start-2 row-span-3 hidden items-start justify-end lg:flex">
          <div className="grid grid-cols-2 gap-6 rounded-lg bg-white/80 p-8">
            <h2 className="col-span-2 text-2xl font-black text-teal-600">
              Novedades Instagram
            </h2>
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
            <InstagramPost />
          </div>
        </div>
        <div className="col-start-1 flex items-center justify-start">
          <div className="rounded-lg lg:bg-slate-200/40 lg:p-4">
            <article className="max-w-sm rounded-tr-sm rounded-tl-[40px] rounded-br-[40px] rounded-bl-sm bg-white p-4 shadow-sm shadow-slate-600/40 lg:max-w-md lg:p-6">
              <p className="text-lg leading-snug text-gray-900">
                Si ésta es tu
                <span className="font-bold"> “primera consulta”</span> en
                nuestra clínica te recomendamos que descargues las órdenes de
                examen previo a tu primera visita. Si ya eres paciente en
                control o bien ya tienes los resultados, puedes
                <span className="font-bold"> “Agendar Hora”</span>.
              </p>
            </article>
          </div>
        </div>
        <div className="col-start-1 flex flex-wrap gap-4">
          <div>
            <Button title="1. Ordenes De Examen" />
          </div>
          <div>
            <Button title="2. Agendar Hora" />
          </div>
        </div>
      </div>
    </section>
  );
}
