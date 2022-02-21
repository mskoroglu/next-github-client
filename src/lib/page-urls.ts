import Repository from "@lib/github/Repository";
import Issue from "@lib/github/Issue";

export const repositoriesPageUrl = `/repositories`;

export function repositoryDetailPageUrl(repository: Repository) {
  return `${repositoriesPageUrl}/${repository.name}`;
}

export function issuesPageUrl(repository: Repository, page?: number) {
  const url = `${repositoryDetailPageUrl(repository)}/issues`;
  return page === undefined ? url : url.concat(`?page=${page}`);
}

export function newIssuePageUrl(repository: Repository) {
  return `${issuesPageUrl(repository)}/new`;
}

export function issueDetailPageUrl(repository: Repository, issue: Issue) {
  return `${issuesPageUrl(repository)}/${issue.number}`;
}
