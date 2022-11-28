export default function Button({
  title,
  small = false,
  icon = null,
  onClick,
  backgroundClassName = "bg-teal-500",
  hoverColor = "hover:bg-teal-400",
}: {
  title: string;
  small?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  backgroundClassName?: string;
  hoverColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 grow-0 items-center justify-center gap-2 rounded-lg transition-colors ${
        small ? "py-2 px-3" : "py-4 px-4"
      } ${backgroundClassName} ${hoverColor} text-base font-black text-slate-50 shadow-md shadow-teal-900/25 lg:text-lg`}
    >
      {title}
      {icon}
    </button>
  );
}
