import { Movie } from "../types";

type Props = {
  data: Array<Movie>;
};

const MovieListItem = ({ Title, Poster, Year, Type }: Movie) => {
  return (
    <div className="w-full px-1 my-1 md:w-1/3 lg:my-4 lg:px-4">
      <div className="overflow-hidden border rounded-lg shadow-lg">
        <div
          className="block w-full overflow-hidden"
          style={{ height: "250px" }}
        >
          {Poster !== "N/A" ? (
            <img
              src={Poster}
              alt={Title}
              className="block w-full h-auto"
              height="250"
            />
          ) : 
            (
            <div className="flex items-center justify-center w-full h-full bg-purple-400"> <span className="text-purple-200">No poster found</span></div>
        
          )}
        </div>
        <div className="py-2 text-center bg-white">
          <div className="font-semibold">
            {Title}
          </div>
          <div className="font-thin">{Type !== 'movie' && Type} {Year}</div>
        </div>
      </div>
    </div>
  );
};

export const MoviesList = ({ data }: Props) => {
  return (
    <div className="flex flex-wrap -mx-1 mt-9 lg:-mx-4 sm:p-2">
      {data.map((movie) => (
        <MovieListItem key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};
