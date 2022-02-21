import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as: keyof React.ReactHTML;
}

export default function Container({
  as,
  className,
  children,
  ...props
}: ContainerProps) {
  return React.createElement(
    as,
    {
      ...props,
      className: clsx("container mx-auto max-w-2xl px-2 lg:px-0", className),
    },
    children
  );
}
