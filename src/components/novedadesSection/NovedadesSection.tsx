import InstagramPost from "../instagramPost/InstagramPost";
import { instagramPath } from "../hero/svgPath";

export default function NovedadesSection() {
  return (
    <section className="w-full rounded-bl-[80px] bg-white pt-10 pb-16 shadow-md shadow-slate-600/40 lg:hidden">
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4">
        <h2 className="mb-6 text-3xl font-black text-teal-900">
          Novedades Instagram
        </h2>
        <div className="mb-6 flex flex-wrap gap-4">
          <InstagramPost />
          <InstagramPost />
        </div>

        <a
          className="flex items-center justify-start gap-1"
          href="https://www.instagram.com/darspa.cl/"
          target="_blank"
        >
          <svg className="h-8 w-8 fill-teal-600" viewBox="0 0 24 24">
            <path d={instagramPath} />
          </svg>
          <h3 className="text-xl font-black text-teal-600">darspa.cl</h3>
        </a>
      </div>
    </section>
  );
}
