import { Octokit } from "octokit";
import { RestEndpointMethods } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types";
import { Session } from "@auth0/nextjs-auth0";
import extractGithubAccessToken from "@lib/extract-github-access-token";
import Repository from "@lib/github/Repository";
import User from "@lib/github/User";
import markdownToHtml from "@lib/markdown-to-html";
import Issue from "@lib/github/Issue";
import Comment from "@lib/github/Comment";

export default class GithubRestClient {
  private readonly restClient: RestEndpointMethods;

  private constructor(token: string) {
    const octokit = new Octokit({ auth: token });
    this.restClient = octokit.rest;
  }

  static fromToken(token: string) {
    return new GithubRestClient(token);
  }

  static fromAuth0Session(session: Session) {
    return extractGithubAccessToken(session).then(GithubRestClient.fromToken);
  }

  async getAuthenticatedUser() {
    const user = await this.restClient.users.getAuthenticated();
    return user.data as User;
  }

  async getRepositories() {
    const repositories = await this.restClient.repos.listForAuthenticatedUser();
    return repositories.data as unknown as Repository[];
  }

  async getRepositoryDetail(
    owner: string,
    repo: string,
    withContributors = false,
    withReadme = false
  ) {
    const repository = await this.restClient.repos.get({ owner, repo });
    const githubRepository = repository.data as unknown as Repository;

    if (withContributors) {
      // bind the contributors
      githubRepository.contributors = await this.getContributors(owner, repo);
    }

    if (withReadme) {
      // bind the readme content
      const readmeContent = await this.getReadmeContent(owner, repo);
      if (readmeContent) {
        githubRepository.readme = readmeContent;
      }
    }

    return githubRepository;
  }

  async getIssues(owner: string, repo: string, page: number) {
    const issues = await this.restClient.issues.listForRepo({
      owner,
      repo,
      state: "all",
      page,
      per_page: 100,
    });
    return issues.data as unknown as Issue[];
  }

  async getIssueDetail(owner: string, repo: string, number: number) {
    const issue = await this.restClient.issues.get({
      owner,
      repo,
      issue_number: number,
    });
    const githubIssue = issue.data as unknown as Issue;
    githubIssue.bodyAsHtml = await markdownToHtml(githubIssue.body);
    githubIssue.issueComments = await this.getIssueComments(
      owner,
      repo,
      number
    );
    return githubIssue;
  }

  async getIssueComments(owner: string, repo: string, number: number) {
    const comments = await this.restClient.issues.listComments({
      owner,
      repo,
      issue_number: number,
    });
    const githubComments = comments.data as unknown as Comment[];
    githubComments.map(async (comment) => {
      comment.bodyAsHtml = await markdownToHtml(comment.body);
    });
    return githubComments;
  }

  async createIssue(owner: string, repo: string, title: string, body: string) {
    const issue = await this.restClient.issues.create({
      owner,
      repo,
      title,
      body,
    });
    return issue.data as unknown as Issue;
  }

  async closeIssue(owner: string, repo: string, number: number) {
    const issue = await this.restClient.issues.update({
      owner,
      repo,
      issue_number: number,
      state: "closed",
    });
    return issue.data as unknown as Issue;
  }

  private async getContributors(owner: string, repo: string) {
    let allContributors: User[] = [];
    let page = 0;

    while (true) {
      const contributors = await this.restClient.repos.listContributors({
        owner,
        repo,
        page: ++page,
        per_page: 100,
      });

      const contributorsData = contributors.data;
      if (!contributorsData?.length) {
        break;
      }

      allContributors = allContributors.concat(
        contributorsData as unknown as User[]
      );
    }

    return allContributors;
  }

  private async getReadmeContent(owner: string, repo: string) {
    try {
      const readme = await this.restClient.repos.getReadme({ owner, repo });
      const buffer = new Buffer(readme.data.content, "base64");
      const markdown = buffer.toString("utf-8");
      return markdownToHtml(markdown);
    } catch (_) {
      // no readme file
    }
  }
}
