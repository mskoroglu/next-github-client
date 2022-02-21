import React from "react";
import Container from "@components/ui/Container";
import Link from "next/link";
import clsx from "clsx";
import UserAvatar from "@components/UserAvatar";
import { repositoriesPageUrl } from "@lib/page-urls";

function HeaderLink(props: { href: string; label: string }) {
  return (
    <Link href={props.href}>
      <a
        className={clsx(
          "py-2 px-4 sm:px-2 md:px-4",
          "transition duration-200",
          "rounded-lg hover:shadow-xl hover:shadow-zinc-700 hover:bg-zinc-700",
          "hover:text-white"
        )}
      >
        {props.label}
      </a>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="bg-zinc-100 py-4">
      <Container as="div" className="flex">
        <Link href={"/profile"}>
          <a>
            <UserAvatar size={48} animate />
          </a>
        </Link>
        <nav
          className={clsx(
            "flex flex-row items-center content-center ml-auto my-auto",
            "text-sm uppercase font-semibold text-zinc-800"
          )}
        >
          <HeaderLink href={repositoriesPageUrl} label="Repositories" />
          <HeaderLink href="/api/auth/logout" label="Logout" />
        </nav>
      </Container>
    </header>
  );
}
