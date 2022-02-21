import propsWithGithubClient from "@lib/props-with-github-client";
import IssueDetailPage, {
  IssueDetailPageData,
} from "@components/issue/IssueDetailPage";

export const getServerSideProps = propsWithGithubClient<IssueDetailPageData>(
  async (githubClient, { user }, context) => {
    const owner = user.nickname;
    const repo = String(context.params!.repository);
    const repository = await githubClient.getRepositoryDetail(owner, repo);

    const issueNumber = String(context.params!.issueNumber);
    const issue = await githubClient.getIssueDetail(
      owner,
      repo,
      Number(issueNumber)
    );
    return { title: issue.title, user, repository, issue };
  }
);

export default IssueDetailPage;
