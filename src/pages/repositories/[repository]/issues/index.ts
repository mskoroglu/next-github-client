import propsWithGithubClient from "@lib/props-with-github-client";
import IssuesPage, { IssuesPageData } from "@components/issue/IssuesPage";

export const getServerSideProps = propsWithGithubClient<IssuesPageData>(
  async (githubClient, { user }, { params, query }) => {
    const owner = user.nickname;
    const repo = String(params!.repository);
    const repository = await githubClient.getRepositoryDetail(owner, repo);

    const page = Number(query!.page ?? 1);
    const issues = await githubClient.getIssues(owner, repo, page);
    return { title: `${repo} / Issues`, user, repository, issues, page };
  }
);

export default IssuesPage;
