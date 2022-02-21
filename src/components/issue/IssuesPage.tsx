import Repository from "@lib/github/Repository";
import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React from "react";
import Issue from "@lib/github/Issue";
import IssueCard from "@components/issue/IssueCard";
import AnchorButton from "@components/ui/AnchorButton";
import Link from "next/link";
import {
  issuesPageUrl,
  newIssuePageUrl,
  repositoryDetailPageUrl,
} from "@lib/page-urls";

export interface IssuesPageData extends PageData {
  repository: Repository;
  issues: Issue[];
  page: number;
}

export default function IssuesPage({
  repository,
  issues,
  page,
  ...pageData
}: IssuesPageData) {
  return (
    <Layout {...pageData}>
      <h1 className="my-4 text-4xl font-mono font-bold text-zinc-800">
        {pageData.title}
      </h1>

      <section className="flex items-center gap-4">
        <Link href={repositoryDetailPageUrl(repository)} passHref>
          <AnchorButton>Return to the repository</AnchorButton>
        </Link>
        <Link href={newIssuePageUrl(repository)} passHref>
          <AnchorButton>New issue</AnchorButton>
        </Link>
      </section>

      {!issues.length ? (
        <span>No issue found</span>
      ) : (
        <React.Fragment>
          {issues.map((issue) => (
            <IssueCard key={issue.id} repository={repository} issue={issue} />
          ))}

          <div className="flex justify-between">
            <Link href={issuesPageUrl(repository, page - 1)} passHref>
              <AnchorButton disabled={page === 1}>Previous page</AnchorButton>
            </Link>
            <Link href={issuesPageUrl(repository, page + 1)} passHref>
              <AnchorButton disabled={issues.length < 100}>
                Next page
              </AnchorButton>
            </Link>
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
}
