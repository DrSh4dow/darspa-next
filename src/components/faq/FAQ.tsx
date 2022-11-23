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
                  ¿Cómo puedo saber los precios de las diferentes terapias?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Los precios se determinan directamente en nuestra clínica
                  después de una evaluación que determina la mejor terapia y el
                  número de sesiones requeridos para cada situación en
                  particular. Esta evaluación tiene un valor de $5000 CLP.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Cómo se saca hora?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  La toma de hora se puede realizar por vía presencial,
                  directamente en calle Sotomayor 576, con la secretaria en
                  horario hábil; vía WhatsApp al número +56 9 7227 5490, también
                  en horario hábil y solo vía mensaje; directamente en nuestra
                  página web www.darspa.cl lo cual puede ser en cualquier
                  momento o día.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Qué medios de pago se aceptan?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Se aceptan efectivo, débito, transferencia, cheques, y
                  tarjetas de crédito, ya sea en pago único o en cuotas.
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
                  El uso de medicamentos se considera un apoyo al cambio de
                  estilos de vida, y su uso depende de cada persona y sus
                  propias características.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Estos tratamientos son solo para personas con obesidad o
                  incluyen a personas con sobrepeso y peso normal?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Los tratamientos están orientados a cualquier persona que
                  desee mejorar algún aspecto de su estilo de vida o su
                  autopercepción corporal, o incluso si solamente se busca
                  sentirse mejor.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Hay planes especiales para deportistas o personas con dietas
                  vegetarianas u otras?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Sí, contamos con nutrición avanzada y con un amplio número de
                  test para determinar la alimentación ideal para cada persona,
                  ya sea para obtener un rendimiento deportivo óptimo y mejorar
                  su composición corporal o para lograr algún requerimiento
                  específico, ya sea por elección como dieta, o por algún
                  problema de salud como hipertensión, diabetes, enfermedad
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
                  Algunas de nuestras prestaciones como kinesiología y nutrición
                  permiten el uso de fonasa e isapre colmena. Adicionalmente,
                  otras de las prestaciones como la consulta médica son
                  solamente particular, bonos de isapre colmena, o reembolso
                  para otras isapres. Las terapias de modelado corporal y otras
                  por considerarse "cosméticas" solo se pueden cancelar de forma
                  particular por los medios de pago descritos anteriormente.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Hay algún límite de edad?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  No, si bien hay que considerar que toda terapia de cambios de
                  estilo de vida son efectivos en personas con criterio formado,
                  y con la disciplina suficiente para realizar este cambio, por
                  lo tanto, el resultado en caso de menores de 18 años es
                  sumamente variable, por esta causa, en este grupo, la
                  presencia de cuidadores o padres es imprescindible.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-bold leading-6 text-teal-900">
                  ¿Cuáles son las vías de contacto?
                </h3>
                <p className="mt-4 text-sm text-slate-700">
                  Puedes contactar vía correo electrónico, vía WhatsApp, o
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
