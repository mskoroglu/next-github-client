import React from "react";
import clsx from "clsx";

interface AnchorButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
}

function Anchor(
  { disabled, className, children, ...props }: AnchorButtonProps,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <a
      {...props}
      className={clsx(
        "bg-zinc-100 rounded-lg px-4 py-2 transition font-medium",
        !disabled && "hover:bg-zinc-200",
        disabled && "text-zinc-400 pointer-events-none",
        className
      )}
      ref={ref}
    >
      {children}
    </a>
  );
}

const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorButtonProps>(
  Anchor
);
export default AnchorButton;
