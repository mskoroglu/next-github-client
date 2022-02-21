import propsWithGithubClient from "@lib/props-with-github-client";
import NewIssuePage, { NewIssuePageData } from "@components/issue/NewIssuePage";

export const getServerSideProps = propsWithGithubClient<NewIssuePageData>(
  async (githubClient, { user }, { params }) => {
    const owner = user.nickname;
    const repo = String(params!.repository);
    const repository = await githubClient.getRepositoryDetail(owner, repo);
    return { title: `${repo} / New Issue`, user, repository };
  }
);

export default NewIssuePage;
