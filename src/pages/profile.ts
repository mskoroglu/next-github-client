import propsWithGithubClient from "@lib/props-with-github-client";
import ProfilePage, { ProfilePageData } from "@components/profile/ProfilePage";

export const getServerSideProps = propsWithGithubClient<ProfilePageData>(
  async (githubClient, { user }) => {
    const githubUser = await githubClient.getAuthenticatedUser();
    return { title: "Profile", user, githubUser };
  }
);

export default ProfilePage;
