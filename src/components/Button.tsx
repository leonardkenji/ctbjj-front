import type { ButtonProps, ButtonSize } from "../interface/ButtonProps"

export const Button = ({
  className = "",
  size = "default",
  children,
  onClick,
  type = "button",
}: ButtonProps) => {
  const baseClass =
    "inline-flex items-center justify-center font-bold tracking-widest uppercase bg-primary text-white hover:bg-primary/80 active:scale-95 transition-all duration-200 cursor-pointer rounded";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${baseClass} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} onClick={onClick} type={type}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
