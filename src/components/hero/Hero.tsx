import Button from "../button/Button";
import Modal from "../modal/Modal";
import Image from "next/image";
import InstagramPost from "../instagramPost/InstagramPost";
import { instagramPath } from "../../utils/svgPath";
import womanSmall from "../../../public/images/woman-shape-small.png";
import womanMid from "../../../public/images/woman-shape-mid.png";
import banner from "../../../public/images/banner.png";
import groupLogo from "../../../public/images/group-logo.png";
import { useState } from "react";

export default function Hero({
  instagramPosts,
}: {
  instagramPosts: string[] | [];
}) {
  const [isOpen, setIsOpen] = useState(false);

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
                Si esta es tu
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
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              title="1. Ordenes De Examen"
            />
          </div>
          <div>
            <a
              href="https://www.doctoralia.cl/daniel-moretti-castillo/medico-general/castro?utm_source=widget-null&utm_medium=link"
              rel="nofollow"
              target="_blank"
            >
              <Button
                title="2. Agendar Hora"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="white"
                    viewBox="0 0 512 512"
                  >
                    <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
                  </svg>
                }
              />
            </a>
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
