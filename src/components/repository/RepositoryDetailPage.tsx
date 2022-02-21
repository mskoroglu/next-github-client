import Repository from "@lib/github/Repository";
import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React from "react";
import RepositoryCard from "@components/repository/RepositoryCard";
import Link from "next/link";
import AnchorButton from "@components/ui/AnchorButton";
import HtmlContent from "@components/ui/HtmlContent";
import { issuesPageUrl } from "@lib/page-urls";

export interface RepositoryDetailPageData extends PageData {
  repository: Repository;
}

export default function RepositoryDetailPage({
  repository,
  ...pageData
}: RepositoryDetailPageData) {
  return (
    <Layout {...pageData}>
      <RepositoryCard repository={repository} />

      <section className="flex items-center gap-4">
        <Link href={issuesPageUrl(repository)} passHref>
          <AnchorButton>
            {repository.open_issues_count} Open Issue(s)
          </AnchorButton>
        </Link>
      </section>

      {!!repository.topics.length && (
        <section className="mt-12">
          <strong className="text-zinc-700 my-2 pl-2 block">TOPICS</strong>
          {repository.topics.map((topic) => (
            <span
              key={topic}
              className="bg-zinc-100 m-1 px-2 rounded-lg inline-block text-sm"
            >
              {topic}
            </span>
          ))}
        </section>
      )}

      {!!repository.contributors.length && (
        <section className="mt-12">
          <strong className="text-zinc-700 my-2 pl-2 block">
            CONTRIBUTORS
          </strong>
          <div className="max-h-32 overflow-auto">
            {repository.contributors.map((contributor) => (
              <span
                key={contributor.id}
                className="bg-zinc-100 m-1 px-2 rounded-lg inline-block text-sm"
              >
                {contributor.login}
              </span>
            ))}
          </div>
        </section>
      )}

      {repository.readme && (
        <section className="mt-12">
          <strong className="text-zinc-700 my-2 pl-2 block">README.md</strong>
          <HtmlContent html={repository.readme} />
        </section>
      )}
    </Layout>
  );
}
