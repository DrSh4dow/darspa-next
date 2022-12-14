import { facebookPath, instagramPath, whatsappPath } from "../../utils/svgPath";
import Image from "next/image";
import logoFooter from "../../../public/images/logo-footer.png";
import CTA from "../../components/cta/CTA";
import Tooltip from "../tooltip/Tooltip";

export default function Footer() {
  return (
    <>
      <CTA />
      <footer className="w-full bg-slate-200">
        <div className="relative mx-auto max-w-screen-2xl py-10 px-2 sm:px-4">
          <div className="grid grid-cols-2 justify-between gap-4 sm:grid-cols-3">
            <div className="col-start-1 row-start-3 flex items-center justify-end px-4 sm:row-span-2 sm:row-start-1 sm:justify-start">
              <Image src={logoFooter} alt="alcanza tu peso ideal con darspa" />
            </div>
            <div className="col-span-2 flex items-center justify-center sm:col-span-1">
              <div className="grid grid-cols-2 items-center justify-center gap-4 sm:gap-2 md:gap-6 lg:gap-8">
                <div>
                  <h4 className="font-bold text-blue-600">WhatsApp</h4>
                  <h5 className="text-sm font-bold text-teal-600">
                    +56 9 7227 5490
                  </h5>
                </div>
                <div>
                  <h4 className="font-bold text-blue-600">Dias de Atención</h4>
                  <h5 className="text-sm font-bold text-teal-600">
                    Lunes a Sabado
                  </h5>
                </div>
                <div>
                  <h4 className="font-bold text-blue-600">Ubicación</h4>
                  <h5 className="text-sm font-bold text-teal-600">
                    E. Sotomayor 576, Castro
                  </h5>
                </div>
                <div>
                  <h4 className="font-bold text-blue-600">
                    Horario de Atención
                  </h4>
                  <h5 className="text-sm font-bold text-teal-600">
                    8:00hrs - 20:00hrs
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-start-2 row-start-3 flex items-center justify-start gap-2 sm:col-start-3 sm:row-start-1 sm:justify-end">
              <a
                rel="noreferrer"
                href="https://www.instagram.com/darspa.cl/"
                target="_blank"
              >
                <Tooltip tooltip="Instagram">
                  <svg className="h-8 w-8 fill-teal-600" viewBox="0 0 24 24">
                    <path d={instagramPath} />
                  </svg>
                </Tooltip>
              </a>
              <a
                rel="noreferrer"
                href="https://www.facebook.com/darspa.cl"
                target="_blank"
              >
                <Tooltip tooltip="Facebook">
                  <svg className="h-8 w-8 fill-teal-600" viewBox="0 0 24 24">
                    <path d={facebookPath} />
                  </svg>
                </Tooltip>
              </a>
              <a
                rel="noreferrer"
                href="https://api.whatsapp.com/send?phone=56972275330&text=Hola!%20vengo%20desde%20darspa.cl%0Ame%20gustaria%20consultar%20sobre..."
                target="_blank"
              >
                <Tooltip tooltip="Whatsapp">
                  <svg className="h-8 w-8 fill-teal-600" viewBox="0 0 24 24">
                    <path d={whatsappPath} />
                  </svg>
                </Tooltip>
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full">
            <p className="text-center text-xs font-black text-slate-600">
              Designed & Developed with{" "}
              <span className="text-red-600">&#10084; </span>by{" "}
              <a
                className="underline"
                rel="noreferrer"
                href="https://danielmoretti.com"
                target="_blank"
              >
                Daniel Moretti V.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
