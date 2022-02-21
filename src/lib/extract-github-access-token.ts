import { ManagementClient } from "auth0";
import { Session } from "@auth0/nextjs-auth0";

const managementClient = new ManagementClient({
  domain: String(process.env.AUTH0_DOMAIN),
  clientId: String(process.env.AUTH0_CLIENT_ID),
  clientSecret: String(process.env.AUTH0_CLIENT_SECRET),
  audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
  scope: "read:users read:user_idp_tokens",
});

function getUserById(id: string) {
  return managementClient.getUser({ id });
}

export default async function extractGithubAccessToken(session: Session) {
  const user = await getUserById(session.user.sub);
  const githubIdentity = user.identities!.find(
    (it) => it.provider === "github"
  );
  return githubIdentity!.access_token!;
}
