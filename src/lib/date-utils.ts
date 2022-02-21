const githubDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatGithubDate(date: string | Date) {
  return githubDateFormatter.format(
    typeof date === "string" ? new Date(date) : date
  );
}
