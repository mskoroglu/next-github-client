import Repository from "@lib/github/Repository";
import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React from "react";
import Issue from "@lib/github/Issue";
import IssueCard from "@components/issue/IssueCard";
import HtmlContent from "@components/ui/HtmlContent";
import UserAvatar from "@components/UserAvatar";
import { formatGithubDate } from "@lib/date-utils";
import Link from "next/link";
import AnchorButton from "@components/ui/AnchorButton";
import { issuesPageUrl, newIssuePageUrl } from "@lib/page-urls";

export interface IssueDetailPageData extends PageData {
  repository: Repository;
  issue: Issue;
}

export default function IssueDetailPage({
  repository,
  issue,
  ...pageData
}: IssueDetailPageData) {
  const [showCloseButton, setShowCloseButton] = React.useState(
    issue.state === "open"
  );

  async function closeIssue() {
    const response = await fetch(`/api/issues/${issue.number}/close`, {
      method: "POST",
      body: JSON.stringify({ repository: repository.full_name }),
    });

    if (response.status !== 204) {
      const responseBody = await response.json();
      console.error("An error occurred when closing the issue", responseBody);
      return alert(
        "An error occurred when closing the issue. Please check the console messages."
      );
    }

    setShowCloseButton(false);
  }

  return (
    <Layout {...pageData}>
      <IssueCard repository={repository} issue={issue} />

      <section className="flex items-center gap-4">
        <Link href={issuesPageUrl(repository)} passHref>
          <AnchorButton>All issues</AnchorButton>
        </Link>
        <Link href={newIssuePageUrl(repository)} passHref>
          <AnchorButton>New issue</AnchorButton>
        </Link>
        {showCloseButton && (
          <button
            className={
              "bg-zinc-100 rounded-lg px-4 py-2 transition font-medium hover:bg-zinc-200"
            }
            onClick={closeIssue}
          >
            Close
          </button>
        )}
      </section>

      <section className="mt-4">
        <HtmlContent html={issue.bodyAsHtml!} />
      </section>

      {issue.issueComments.map((comment) => (
        <section key={comment.id} className="mt-8 flex gap-4 items-start">
          <UserAvatar
            size={48}
            user={{
              name: comment.user.login,
              picture: comment.user.avatar_url,
            }}
          />
          <div className="flex-grow overflow-auto">
            <span className="text-zinc-500">
              <strong className="text-zinc-700">{comment.user.login}</strong>
              {` `}
              commented on {formatGithubDate(comment.updated_at)}
            </span>
            <HtmlContent html={comment.bodyAsHtml!} />
          </div>
        </section>
      ))}
    </Layout>
  );
}
