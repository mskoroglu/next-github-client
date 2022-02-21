import React from "react";
import Head from "next/head";
import PageData, { PageDataProvider } from "@components/PageData";
import Header from "@components/layout/Header";
import Container from "@components/ui/Container";

interface LayoutProps extends PageData, React.PropsWithChildren<{}> {}

export default function Layout(props: LayoutProps) {
  const { children, ...pageData } = props;
  return (
    <React.Fragment>
      <Head>
        <title>{pageData.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <PageDataProvider pageData={pageData}>
        <Header />
        <Container as="main" className="py-4">
          {children}
        </Container>
        <footer className="container max-w-6xl border-t text-center my-4 pt-4 text-sm text-zinc-700">
          <a
            href="https://github.com/mskoroglu/next-github-client"
            className="font-mono hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Source code
          </a>
        </footer>
      </PageDataProvider>
    </React.Fragment>
  );
}
