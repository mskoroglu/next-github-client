import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import GithubRestClient from "@lib/github/GithubRestClient";

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res)!;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const githubClient = await GithubRestClient.fromAuth0Session(session);
  const { repository } = JSON.parse(req.body);
  const [owner, repo] = repository.split("/");
  const issueNumber = Number(req.query.issueNumber);
  await githubClient.closeIssue(owner, repo, issueNumber);

  res.status(204).end();
});
