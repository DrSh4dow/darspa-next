import Image from "next/image";

export default function InstagramPost({
  src = "/images/spin.gif",
  alt = "post de instagram",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <article className="group cursor-pointer rounded-lg bg-slate-50 p-4 shadow-md">
      <div className="h-80 w-80 overflow-hidden lg:h-52 lg:w-52">
        <Image
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={240}
          height={240}
          src={src}
          alt={alt}
        />
      </div>
    </article>
  );
}
