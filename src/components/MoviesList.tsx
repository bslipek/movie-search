import { Movie } from "../types";

type Props = {
  data: Array<Movie>;
};

const MovieListItem = ({ Title, Poster, Year }: Movie) => {
  return (
    <div className="w-full px-1 my-1 md:w-1/3 lg:my-4 lg:px-4">
      <div className="overflow-hidden border rounded-lg shadow-lg">
        <div
          className="block w-full overflow-hidden"
          style={{ height: "250px" }}
        >
          {Poster !== "N/A" && (
            <img
              src={Poster}
              alt={Title}
              className="block w-full h-auto"
              height="250"
            />
          )}
        </div>
        <div className="py-2 text-center bg-white">
          <div className="font-semibold">{Title}</div>
          <div className="font-thin">{Year}</div>
        </div>
      </div>
    </div>
  );
};

export const MoviesList = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap mt-6 -mx-1 lg:-mx-4">
      {data.map((movie) => (
        <MovieListItem {...movie} />
      ))}
    </div>
  );
};
