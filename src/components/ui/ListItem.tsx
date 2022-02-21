import React from "react";
import Link from "next/link";

interface ListItemProps extends React.PropsWithChildren<{}> {
  link: {
    href: string;
    label: string;
  };
  footerItems: React.ReactNode[];
}

export default function ListItem(props: ListItemProps) {
  return (
    <section className="my-2 px-2 py-4 group rounded-lg hover:bg-zinc-100">
      <Link href={props.link.href}>
        <a className="font-bold font-mono text-xl group-hover:underline underline-offset-4 decoration-4 decoration-zinc-700">
          {props.link.label}
        </a>
      </Link>

      {props.children}

      <footer className="flex flex-wrap gap-4 my-2 font-mono text-sm">
        {props.footerItems.map(
          (item, i) =>
            item && (
              <span key={i} className="inline-flex gap-1 items-center">
                {item}
              </span>
            )
        )}
      </footer>
    </section>
  );
}
