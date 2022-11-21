import Button from "../button/Button";
import Image from "next/image";
import InstagramPost from "../instagramPost/InstagramPost";
import { instagramPath } from "../../utils/svgPath";
import womanSmall from "../../../public/images/woman-shape-small.png";
import womanMid from "../../../public/images/woman-shape-mid.png";
import banner from "../../../public/images/banner.png";
import groupLogo from "../../../public/images/group-logo.png";

export default function Hero({
  instagramPosts,
}: {
  instagramPosts: string[] | [];
}) {
  return (
    <section className="relative w-full shadow-sm shadow-slate-600/40 lg:shadow-none">
      <div className="absolute -z-10 h-full w-full bg-slate-50/75 lg:hidden" />
      <Image
        className="absolute right-0 top-0 -z-20 h-full sm:hidden"
        src={womanSmall}
        alt="modelado corporal dar spa"
        placeholder="blur"
      />
      <Image
        className="absolute right-0 top-0 -z-20 hidden h-full sm:block lg:hidden"
        src={womanMid}
        alt="baja la barriga con dar spa"
        placeholder="blur"
      />
      <Image
        className="absolute -z-20 hidden h-full w-full object-cover lg:block"
        src={banner}
        alt="entrena cuerpo y mente de forma sana con Dar Spa"
        placeholder="blur"
      />
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 px-2 pt-20 pb-10 sm:gap-8 sm:px-4 sm:pt-32 lg:grid-cols-2 lg:pt-10 lg:pb-56">
        <div className="hidden overflow-hidden pb-20 lg:block">
          <Image
            src={groupLogo}
            alt="logo de dar spa clinica estetica de modelado corporal"
          />
        </div>
        <div className="lg:hidden">
          <h1 className="mb-1 font-montserrat text-4xl font-bold text-slate-900 sm:text-5xl">
            Clínica <br className="sm:hidden" />
            DarSpa
          </h1>
          <h2 className="font-montserrat text-xl font-bold text-teal-600 sm:text-2xl">
            Modelado Corporal <br />
            No Invasivo
          </h2>
        </div>
        <div className="col-start-2 row-span-3 hidden items-start justify-end lg:flex">
          <div className="grid grid-cols-2 gap-6 rounded-lg bg-white/80 p-8">
            <h2 className="col-span-2 text-2xl font-black text-teal-700">
              Novedades Instagram
            </h2>
            {instagramPosts.length > 1 ? (
              instagramPosts.map((url) => <InstagramPost key={url} src={url} />)
            ) : (
              <>
                <InstagramPost />
                <InstagramPost />
                <InstagramPost />
                <InstagramPost />
              </>
            )}
            <div className="col-span-2 flex justify-end">
              <a
                className="flex items-center justify-end gap-1"
                href="https://www.instagram.com/darspa.cl/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 stroke-teal-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
                <svg className="h-8 w-8 fill-teal-600" viewBox="0 0 24 24">
                  <path d={instagramPath} />
                </svg>
                <h3 className="text-lg font-black text-teal-600">darspa.cl</h3>
              </a>
            </div>
          </div>
        </div>
        <div className="col-start-1 flex items-center justify-start">
          <div className="rounded-lg lg:bg-slate-200/40 lg:p-4">
            <article className="max-w-sm rounded-tr-sm rounded-tl-[40px] rounded-br-[40px] rounded-bl-sm bg-white p-4 shadow-sm shadow-slate-600/40 lg:max-w-md lg:p-6">
              <p className="text-lg leading-snug text-slate-900">
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
      <div className="absolute bottom-0 left-0 hidden w-full overflow-hidden leading-[0] lg:block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[73px] w-[calc(170%+1.3px)] rotate-y-180"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
}
