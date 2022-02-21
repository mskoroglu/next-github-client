import { Claims } from "@auth0/nextjs-auth0";
import React from "react";

const PageDataContext = React.createContext<PageData | null>(null);

interface PageDataProviderProps extends React.PropsWithChildren<{}> {
  pageData: PageData;
}

export function PageDataProvider(props: PageDataProviderProps) {
  return (
    <PageDataContext.Provider value={props.pageData}>
      {props.children}
    </PageDataContext.Provider>
  );
}

export function usePageData<T extends PageData>(): T {
  return React.useContext(PageDataContext) as T;
}

export default interface PageData {
  title: string;
  user: Claims;
}
