export default function InstagramPost({
  src = "/images/spin.gif",
  alt = "post de instagram",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <article className="cursor-pointer rounded-lg bg-slate-50 p-4 shadow-md">
      <img
        className="h-80 w-80 object-cover lg:h-52 lg:w-52"
        src={src}
        alt={alt}
      />
    </article>
  );
}
