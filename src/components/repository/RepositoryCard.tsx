import Repository from "@lib/github/Repository";
import StarIcon from "@components/ui/icon/StarIcon";
import ForkIcon from "@components/ui/icon/ForkIcon";
import LicenseIcon from "@components/ui/icon/LicenseIcon";
import React from "react";
import ListItem from "@components/ui/ListItem";
import { formatGithubDate } from "@lib/date-utils";
import { repositoryDetailPageUrl } from "@lib/page-urls";

interface RepositoryCardProps {
  repository: Repository;
}

export default function RepositoryCard(props: RepositoryCardProps) {
  const {
    full_name,
    description,
    language,
    stargazers_count,
    forks_count,
    license,
    updated_at,
  } = props.repository;

  return (
    <ListItem
      link={{
        href: repositoryDetailPageUrl(props.repository),
        label: full_name,
      }}
      footerItems={[
        language && (
          <span className="bg-zinc-100 px-2 rounded-lg">{language}</span>
        ),
        !!stargazers_count && (
          <>
            <StarIcon />
            {stargazers_count}
          </>
        ),
        !!forks_count && (
          <>
            <ForkIcon />
            {forks_count}
          </>
        ),
        license && (
          <>
            <LicenseIcon />
            {license.spdx_id}
          </>
        ),
        `Updated on ${formatGithubDate(updated_at)}`,
      ]}
    >
      {description && <p className="my-2">{description}</p>}
    </ListItem>
  );
}
