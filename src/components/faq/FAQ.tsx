export default function FAQ() {
  return (
    <section className="bg-slate-50 pb-10">
      <div className="mx-auto max-w-screen-2xl py-10 px-2 sm:px-4">
        <h2 className="mb-2 text-left text-3xl font-black text-teal-900 lg:text-5xl">
          Preguntas Frecuentes
        </h2>
        <p className="mb-8 text-sm font-bold text-slate-600">
          Si tiene alguna pregunta que no se responda aqui,{" "}
          <a
            className="cursor-pointer text-blue-600 underline"
            href="mailto:contacto@darspa.cl"
          >
            contactenos
          </a>
          .
        </p>
        <div className="grid max-w-2xl list-none grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          <li>
            <ul role="list" className="space-y-10">
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Como puedo saber los precios de las diferentes terapias?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Los precios se determinan directamente en nuestra clinica
                  despues de una evaluacion que determina la mejor terapia y el
                  numero de sesiones requeridos para cada situacion en
                  particular. Esta evaluacion tiene un valor de $5000 CLP.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿como se saca hora?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  La toma de hora se puede realizar por via presencial,
                  directamente en calle sotomayor 576, con la secretaria en
                  horario habil; via whatsapp al numero +56 9 7227 5490 tambien
                  en horario hábil y solo via mensaje; directamente en nuestra
                  pagina web www.darspa.cl lo cual puede ser en cualquier
                  momento o día.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Que medios de pago se aceptan?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Se aceptan efectivo, debito, transferencia, cheques, y
                  tarjetas de credito ya sea en pago unico o en cuotas.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="space-y-10">
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Se utilizan medicamentos para el control del peso?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  El uso de medicamentos se considera un apoyo a el cambio de
                  estilos de vida, y su uso depende de cada persona y sus
                  propias caracteristicas.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Estos tratamientos son solo para personas con obesidad o
                  incluyen a personas con sobrepeso y peso normal?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Los tratamientos estan orientados a cualquier persona que
                  desee mejorar algun aspecto de su estilo de vida o su
                  autopercepcion corporal o incluso si solamente se busca
                  sentirse mejor.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿hay planes especiales para deportistas o personas con dietas
                  vegetarianas u otras?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Si, contamos con nutricion avanzada y con un amplio numero de
                  test para determinar la alimentacion ideal para cada persona,
                  ya sea para obtener un rendimiento deportivo optimo y mejorar
                  su composicion corporal o para lograr algun requerimiento
                  especifico ya sea por eleccion como dieta, o por algun
                  problema de salud como hipertension, diabetes, enfermedad
                  celiaca, y otros.
                </p>
              </li>
            </ul>
          </li>
          <li>
            <ul role="list" className="space-y-10">
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Atienden con fonasa o isapres?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Algunas de nuestras prestaciones como kinesiologia y nutricion
                  permiten el uso de fonasa e isapre colmena. Adicionalmente
                  otras de las prestaciones como la consulta medica son
                  solamente particular, bonos de isapre colmena, o reembolso
                  para otras isapres. Las terapias de modelado corporal y otras
                  por considerarse "cosmeticas" solo se pueden cancelar de forma
                  particular por los medios de pago descritos anteriormente.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Hay algun limite de edad?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  No, si bien hay que considerar que toda terapia de cambios de
                  estilo de vida son efectivos en personas con criterio formado,
                  y con la disciplina suficiente para realizar este cambio, por
                  lo tanto, el resultado en caso de menores de 18 años es
                  sumamente variable, por esta causa, en este grupo, la
                  presencia de cuidadores o padres es impresindible.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Cuales son las vias de contacto?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Puedes contactar via correo electronico, via whatsapp, o
                  consultando directamente en nuestras instalaciones.
                </p>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </section>
  );
}
