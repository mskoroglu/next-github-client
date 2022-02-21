import React from "react";
import { usePageData } from "@components/PageData";
import clsx from "clsx";

interface UserAvatarProps {
  size: number;
  ring?: "ring-8";
  animate?: true;
  user?: { picture: string; name: string };
}

export default function UserAvatar(props: UserAvatarProps) {
  const pageData = usePageData();
  const user = props.user ?? pageData.user;
  return (
    <img
      className={clsx(
        "rounded-full ring-zinc-100 mx-auto shadow-lg shadow-zinc-500",
        props.ring ?? "ring-4",
        props.animate &&
          "transition hover:scale-110 duration-200 hover:shadow-xl hover:shadow-zinc-700"
      )}
      src={user.picture}
      alt={user.name}
      width={props.size}
      height={props.size}
    />
  );
}
