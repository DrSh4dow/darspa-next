export default function Button({
  title,
  small = false,
}: {
  title: string;
  small?: boolean;
}) {
  return (
    <button
      className={`flex shrink-0 grow-0 items-center justify-center rounded-xl ${
        small ? "p-2" : "p-4"
      } bg-teal-500 text-base font-black text-slate-50 shadow-md shadow-teal-900/25 lg:text-lg`}
    >
      {title}
    </button>
  );
}
