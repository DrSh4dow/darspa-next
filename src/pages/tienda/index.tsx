import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ShopQuickView from "../../components/shopQuickView/ShopQuickView";

const Tienda: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = [
    {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "48.000",
      imageSrc: "/images/stones.png",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      name: "Nomad Tumbler",
      href: "#",
      price: "35.000",
      imageSrc: "/images/stones.png",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      name: "Focus Paper Refill",
      href: "#",
      price: "89.000",
      imageSrc: "/images/stones.png",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      name: "Machined Mechanical Pencil",
      href: "#",
      price: "35.000",
      imageSrc: "/images/stones.png",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
    // More products...
  ];
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
            Compra y Regala Nuestros Servicios
          </h1>
          <p className="mb-2 text-center text-sm font-bold text-slate-600 ">
            Conoce, compra, y regala nuestros servicios mediante GiftCards!
            <br />
            escoge la cantidad de sesiones y compra una GiftCard
          </p>
        </div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Productos</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <figure
                key={product.id}
                className="group cursor-pointer"
                onClick={() => setIsOpen(true)}
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
                  ${product.price}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ShopQuickView open={isOpen} setOpen={setIsOpen} />
    </>
  );
};

export default Tienda;
