import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import GithubRestClient from "@lib/github/GithubRestClient";
import { issueDetailPageUrl } from "@lib/page-urls";
import Repository from "@lib/github/Repository";

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res)!;

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const githubClient = await GithubRestClient.fromAuth0Session(session);
  const { repository, title, body } = JSON.parse(req.body);
  const [owner, repo] = repository.split("/");
  const issue = await githubClient.createIssue(owner, repo, title, body);

  const location = issueDetailPageUrl({ name: repo } as Repository, issue);
  res.setHeader("Location", location).status(201).end();
});
