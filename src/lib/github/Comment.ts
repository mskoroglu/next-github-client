export default interface Comment {
  id: number;
  body: string;
  updated_at: Date;
  user: { login: string; avatar_url: string };

  bodyAsHtml?: string;
}
