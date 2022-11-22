export default function Button({
  title,
  small = false,
  icon = null,
  onClick = () => {},
}: {
  title: string;
  small?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 grow-0 items-center justify-center gap-2 rounded-xl ${
        small ? "p-2" : "p-4"
      } bg-teal-500 text-base font-black text-slate-50 shadow-md shadow-teal-900/25 lg:text-lg`}
    >
      {title}
      {icon}
    </button>
  );
}
