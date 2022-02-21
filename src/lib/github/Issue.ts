import Comment from "@lib/github/Comment";

export default interface Issue {
  id: number;
  number: number;
  comments: number;
  title: string;
  body: string;
  state: "open" | "closed";
  created_at: Date;
  closed_at?: Date;
  labels: { name: string }[];

  bodyAsHtml?: string;
  issueComments: Comment[];
}
