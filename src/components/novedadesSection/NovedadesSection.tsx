import InstagramPost from "../instagramPost/InstagramPost";
import { instagramPath } from "../../utils/svgPath";

export default function NovedadesSection({
  instagramPosts,
}: {
  instagramPosts: string[] | [];
}) {
  return (
    <section className="w-full rounded-bl-[80px] bg-white pt-10 pb-16 shadow-md shadow-slate-600/40 lg:hidden">
      <div className="mx-auto max-w-screen-2xl px-2 sm:px-4">
        <h2 className="mb-6 text-3xl font-black text-teal-900">
          Novedades Instagram
        </h2>
        <div className="mb-6 flex flex-wrap gap-4">
          {instagramPosts.length > 1 ? (
            instagramPosts.map((url) => <InstagramPost key={url} src={url} />)
          ) : (
            <>
              <InstagramPost />
              <InstagramPost />
            </>
          )}
        </div>

        <a
          className="inline-flex items-center justify-start gap-1"
          href="https://www.instagram.com/darspa.cl/"
          target="_blank"
          rel="noreferrer"
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
          <h3 className="text-xl font-black text-teal-600">darspa.cl</h3>
        </a>
      </div>
    </section>
  );
}
