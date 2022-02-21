import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React from "react";
import User from "@lib/github/User";
import InfoTable from "@components/InfoTable";
import UserAvatar from "@components/UserAvatar";

export interface ProfilePageData extends PageData {
  githubUser: User;
}

export default function ProfilePage(pageData: ProfilePageData) {
  return (
    <Layout {...pageData}>
      <div className="text-center">
        <UserAvatar size={256} ring={"ring-8"} />

        <h1 className="mx-auto mt-8 text-4xl font-mono font-bold text-zinc-800">
          {pageData.user.name}
        </h1>
        <span className="text-xl text-zinc-700">@{pageData.user.nickname}</span>

        <InfoTable title={"Auth0 User Info"} info={pageData.user} />
        <InfoTable title={"GitHub User Info"} info={pageData.githubUser} />
      </div>
    </Layout>
  );
}
