import Repository from "@lib/github/Repository";
import Layout from "@components/layout/Layout";
import PageData from "@components/PageData";
import React from "react";
import RepositoryCard from "@components/repository/RepositoryCard";
import FilterListBox from "@components/ui/FilterListBox";

const sortOptions = ["Last updated", "Name", "Stars"] as const;
type SortType = typeof sortOptions[number];

function useSearchFilter(searchTerm?: string) {
  return React.useCallback(
    (repo: Repository) =>
      !searchTerm?.length ||
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
    [searchTerm]
  );
}

function useLanguageFilter(language?: string) {
  return React.useCallback(
    (repo: Repository) => language === undefined || repo.language === language,
    [language]
  );
}

function useSorting(sortType: SortType) {
  return React.useCallback(
    (a: Repository, b: Repository) => {
      if (sortType === "Last updated") {
        return a.updated_at > b.updated_at ? -1 : 1;
      }

      if (sortType === "Stars") {
        return a.stargazers_count > b.stargazers_count ? -1 : 1;
      }

      // sort by name
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      if (aName < bName) {
        return -1;
      }

      if (aName > bName) {
        return 1;
      }

      return 0;
    },
    [sortType]
  );
}

function extractLanguages(repositories: Repository[]) {
  const languages = new Set(
    repositories.map((repository) => repository.language)
  );
  return Array.from(languages).filter((it) => !!it);
}

export interface RepositoriesPageData extends PageData {
  repositories: Repository[];
}

export default function RepositoriesPage(pageData: RepositoriesPageData) {
  const languages = extractLanguages(pageData.repositories);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>();
  const [sortType, setSortType] = React.useState<SortType>("Last updated");

  const searchFilter = useSearchFilter(searchTerm);
  const languageFilter = useLanguageFilter(language);
  const sort = useSorting(sortType);
  const repositories = React.useMemo(() => {
    return pageData.repositories
      .filter(searchFilter)
      .filter(languageFilter)
      .sort(sort);
  }, [pageData.repositories, searchFilter, languageFilter, sort]);

  return (
    <Layout {...pageData}>
      <h1 className="my-4 text-4xl font-mono font-bold text-zinc-800">
        {pageData.title}
      </h1>

      <section className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <input
          type="text"
          className="border border-zinc-300 text-zinc-900 text-sm rounded block w-full p-2.5"
          placeholder="Find a repository..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="w-full flex justify-between gap-4">
          <FilterListBox
            label="Language"
            undefinedLabel="All"
            value={language}
            onChange={setLanguage}
            options={[undefined, ...languages]}
          />

          <FilterListBox
            label="Sort"
            value={sortType}
            onChange={(value) => setSortType(value as SortType)}
            options={sortOptions}
          />
        </div>
      </section>

      {repositories.map((repo) => (
        <RepositoryCard repository={repo} key={repo.id} />
      ))}
    </Layout>
  );
}
