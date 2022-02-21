import User from "@lib/github/User";

export default interface Repository {
  id: string;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: Date;
  language: string;
  license: { spdx_id: string };
  topics: string[];

  readme?: string;
  contributors: User[];
}
