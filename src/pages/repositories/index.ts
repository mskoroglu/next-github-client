import RepositoriesPage, {
  RepositoriesPageData,
} from "@components/repository/RepositoriesPage";
import propsWithGithubClient from "@lib/props-with-github-client";

export const getServerSideProps = propsWithGithubClient<RepositoriesPageData>(
  async (githubClient, { user }) => {
    const repositories = await githubClient.getRepositories();
    return { title: "Repositories", user, repositories };
  }
);

export default RepositoriesPage;
