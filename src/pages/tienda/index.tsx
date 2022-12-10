import { type NextPage } from "next";
import Head from "next/head";
import { formatter } from "../../utils/util";
import Image from "next/image";
import { useState } from "react";
import ShopQuickView from "../../components/shopQuickView/ShopQuickView";
import * as prismic from "@prismicio/client";

const Tienda: NextPage<{
  filteredProductos: {
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    id: string;
  }[];
}> = ({ filteredProductos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(filteredProductos[0]);

  return (
    <>
      <Head>
        <title>Dar Spa | Tienda</title>
        <meta
          name="description"
          content="Somos un conjunto de profesionales, técnicos y 
                   administrativos dedicados a dar respuesta integral a 
                   algunos de los problemas emergentes mas importantes del 
                   tiempo moderno, la falta de alimentación mas saludable, el
                   incremento de obesidad, la perdida de la autoestima y 
                   el deporte como estilo de vida."
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://darspa.cl" />
      </Head>
      <section>
        <div className="mx-auto max-w-screen-2xl px-2 pt-20 sm:px-4">
          <h1 className="mb-2 text-center text-3xl font-black text-teal-900 lg:text-5xl">
            Compra, Imprime y Regala una Gift-Card!
          </h1>
          <p className="mb-2 text-center text-sm font-bold text-slate-600 ">
            Conoce, compra, y regala nuestros servicios mediante GiftCards!
            <br />
            Selecciona el diseño de tu GiftCard e Imprime tu regalo.
          </p>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Productos</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProductos.map((product) => (
              <figure
                key={product.id}
                className="group cursor-pointer"
                onClick={() => {
                  setIsOpen(true);
                  setSelectedProduct(product);
                }}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    width={320}
                    height={320}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-slate-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-slate-900">
                  {formatter.format(product.price)}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ShopQuickView
        open={isOpen}
        setOpen={setIsOpen}
        product={selectedProduct}
      />
    </>
  );
};

export async function getStaticProps() {
  const client = prismic.createClient("darspa");
  const productos = await client.getAllByType("producto");
  const filteredProductos = productos
    .filter((p) => p.data.active)
    .map(({ data, id }) => {
      return {
        name: data.name[0].text,
        price: Number(data.price),
        imageSrc: data.picture.url ?? "/images/stones.png",
        imageAlt: data.picture.alt ?? "Giftcard DarSpa",
        description: data.description[0].text ?? "",
        id: id,
      };
    });

  return {
    props: {
      filteredProductos,
    },

    revalidate: 86400,
  };
}

export default Tienda;
