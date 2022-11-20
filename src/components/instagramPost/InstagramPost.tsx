export default function InstagramPost({
  src = "/images/spin.gif",
  alt = "post de instagram",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <article className="cursor-pointer rounded-lg bg-slate-50 p-4 shadow-md">
      <img className="h-52 w-52 object-cover" src={src} alt={alt} />
    </article>
  );
}
