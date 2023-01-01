export default function Button({
  title,
  small = false,
  icon = null,
  onClick,
  backgroundClassName = "bg-teal-500",
  hoverColor = "hover:bg-teal-400",
  disabled = false,
}: {
  title: string;
  small?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  backgroundClassName?: string;
  hoverColor?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex shrink-0 grow-0 items-center justify-center gap-2 rounded-lg transition-shadow ${
        small ? "py-2 px-3" : "py-4 px-4"
      } ${
        disabled ? "bg-gray-400" : `${backgroundClassName} ${hoverColor} hover:shadow-lg`
      }  text-base font-black text-slate-50 shadow-md shadow-teal-900/25  lg:text-lg`}
    >
      {title}
      {icon}
    </button>
  );
}
