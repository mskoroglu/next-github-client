import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "@auth0/nextjs-auth0";
import GithubRestClient from "@lib/github/GithubRestClient";
import propsWithSession from "@lib/props-with-session";

type PropsSupplier<P> = (
  githubClient: GithubRestClient,
  session: Session,
  context: GetServerSidePropsContext
) => Promise<P>;

export default function propsWithGithubClient<P>(
  propsSupplier: PropsSupplier<P>
): GetServerSideProps<P> {
  return propsWithSession<P>(async (session, context) => {
    const githubClient = await GithubRestClient.fromAuth0Session(session);
    return await propsSupplier(githubClient, session, context);
  });
}
