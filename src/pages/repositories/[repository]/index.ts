import propsWithGithubClient from "@lib/props-with-github-client";
import RepositoryDetailPage, {
  RepositoryDetailPageData,
} from "@components/repository/RepositoryDetailPage";

export const getServerSideProps =
  propsWithGithubClient<RepositoryDetailPageData>(
    async (githubClient, { user }, context) => {
      const owner = user.nickname;
      const repo = String(context.params!.repository);
      const repository = await githubClient.getRepositoryDetail(
        owner,
        repo,
        true,
        true
      );
      return { title: repository.full_name, user, repository };
    }
  );

export default RepositoryDetailPage;
