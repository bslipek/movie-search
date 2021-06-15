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
        <div className="flex-1 p-3 text-center bg-white bg-opacity-50 rounded-md shadow-lg backdrop-blur-md">
          <SearchInput {...{ onChange: setQueryT, initialValue: queryT }} />
          {isLoading && <div>Loading...</div>}
          {data?.Response === "False" && queryT && <div>Not found</div>}
        </div>
      </div>

      {data?.Response === "True" && <MoviesList {...{ data: data.Search }} />}
    </CenteredLayout>
  );
};
