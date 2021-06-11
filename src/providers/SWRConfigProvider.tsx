import { SWRConfig } from "swr";

type Query = {
  /**	Movie title to search for. */
  s?: string;
  /** Year of release. */
  y?: string;
};

export async function fetcher(query: Query = {}, path: string = "") {
  let url = new URL(`http://www.omdbapi.com/${path}`);
  url.search = new URLSearchParams(query).toString();

  const res = await fetch(url.toString());

  if (!res.ok) throw res;

  return res.json();
}

type Props = {
  children: React.ReactNode;
};

export const SWRConfigProvider = ({ children }: Props) => {
  return (
    <SWRConfig value={{ fetcher, refreshInterval: 60000 }}>
      {children}
    </SWRConfig>
  );
};
