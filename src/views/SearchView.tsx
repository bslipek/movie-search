import React from "react";
import useSWR from "swr";
import { CenteredLayout, MoviesList, SearchInput } from "../components";
import { useQueryParam } from "../hooks";
import { Movie } from "../types";

type SuccessResponse = {
  Response: "True";
  totalResults: number;
  Search: Array<Movie>;
};

type ErrorResponse = {
  Response: "False";
  Error: string;
};

type Response = SuccessResponse | ErrorResponse;

const Info = ({  children  }: { children: React.ReactNode  }) => (
   <div className="absolute inset-x-0">
   <div className="relative inline-block h-8 px-3 py-2 -m-4 bg-white bg-opacity-50 shadow-lg rounded-b-md top-7">
     <div className="relative inline-block px-5 py-2 text-gray-600 bg-white -top-7 rounded-b-md">{children}</div>
   </div>
   </div>
);

export const SearchView = () => {
  const [queryT, setQueryT] = useQueryParam("s", "");

  const { data, error } = useSWR<Response>(`/${window.location.search}`);
  const isLoading = !error && !data;

  return (
    <CenteredLayout>
      <div
        className="sticky flex items-end justify-center w-full"
        style={{
          paddingTop: "40vh",
          top: "-40.5vh",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="relative flex-1 p-3 text-center bg-white bg-opacity-50 rounded-md shadow-lg backdrop-blur-md">
          <SearchInput {...{ onChange: setQueryT, initialValue: queryT }} />
          {isLoading && <Info>Loading...</Info>}
          {data?.Response === "False" && queryT && <Info>Not found</Info>}
          {data?.Response === "True" && <Info>Total: {data.totalResults}</Info>}
        </div>
      </div>

      {data?.Response === "True" && <MoviesList {...{ data: data.Search }} />}
    </CenteredLayout>
  );
};
