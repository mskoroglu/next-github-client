import Repository from "@lib/github/Repository";
import React from "react";
import ListItem from "@components/ui/ListItem";
import Issue from "@lib/github/Issue";
import { formatGithubDate } from "@lib/date-utils";
import CommentIcon from "@components/ui/icon/CommentIcon";
import OpenIssueIcon from "@components/ui/icon/OpenIssueIcon";
import ClosedIssueIcon from "@components/ui/icon/ClosedIssueIcon";
import { issueDetailPageUrl } from "@lib/page-urls";

interface IssueCardProps {
  repository: Repository;
  issue: Issue;
}

export default function IssueCard(props: IssueCardProps) {
  const { number, comments, title, created_at, closed_at, labels } =
    props.issue;
  return (
    <ListItem
      link={{
        href: issueDetailPageUrl(props.repository, props.issue),
        label: title,
      }}
      footerItems={[
        !closed_at && (
          <>
            <OpenIssueIcon />
            Open
          </>
        ),
        !!closed_at && (
          <>
            <ClosedIssueIcon />
            Closed
          </>
        ),
        !!labels.length &&
          labels.map((label) => (
            <span key={label.name} className="bg-zinc-100 px-2 rounded-lg">
              {label.name}
            </span>
          )),
        !!comments && (
          <>
            <CommentIcon />
            {comments}
          </>
        ),
        closed_at
          ? `#${number} was closed on ${formatGithubDate(closed_at)}`
          : `#${number} opened on ${formatGithubDate(created_at)}`,
      ]}
    />
  );
}
