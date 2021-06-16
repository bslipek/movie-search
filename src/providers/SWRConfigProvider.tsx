import { SWRConfig } from "swr";

export async function fetcher(path: string = "") {
  let url = `http://www.omdbapi.com/${path}`;
  url += url.includes("?") ? "&" : "?";
  url += "apikey=12a9e3ee";

  const res = await fetch(url);

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
