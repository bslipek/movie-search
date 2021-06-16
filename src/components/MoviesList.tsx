import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Movie } from "../types";
import { MoviePreview } from "./MoviePreview";

const MovieListItem = 
    ({
      Title,
      Poster,
      Year,
      Type,
      imdbID,
      isSelected,
      setSelected,
    }: Movie & {
      isSelected: boolean;
      setSelected: () => void;
    }) => {
      return (
        <motion.div
          key={`motion-${imdbID}`}
          layout
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            setSelected();
          }}
          className={`w-full px-1 my-1 md:w-1/3 lg:my-4 lg:px-4 max-w-sm`}
        >
          <div
            className={`overflow-hidden rounded-lg shadow-lg border ${
              isSelected ? "scale-110" : ""
            }`}
          >
            <div
              className="block w-full overflow-hidden"
              style={{ height: "250px" }}
            >
              {Poster !== "N/A" ? (
                <div className="rounded ">
                  <img
                    src={Poster}
                    alt={Title}
                    height="250"
                    className="block w-full h-auto cursor-zoom-in"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-purple-400">
                  {" "}
                  <span className="text-purple-200">No poster found</span>
                </div>
              )}
            </div>
            <div className="py-2 text-center bg-white">
              <div className="font-semibold">{Title}</div>
              <div className="font-thin">
                {Type !== "movie" && Type} {Year}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

type Props = {
  data?: Array<Movie>;
};

export const MoviesList = ({ data = [] }: Props) => {
  const [selected, setSelected] = useState<Movie>();

  return (
    <AnimatePresence>
      <div
        className="flex flex-wrap justify-center px-3 mt-9 sm:p-2"
        onClick={() => setSelected(undefined)}
      >
        {data.map((movie) => (
          <MovieListItem
            key={movie.imdbID}
            {...{
              ...movie,
              setSelected: () => setSelected(movie),
              isSelected: selected?.imdbID === movie.imdbID,
            }}
          />
        ))}
      </div>
      {selected && (
        <MoviePreview
          key="moviePreview"
          {...{ ...selected, close: () => setSelected(undefined) }}
        />
      )}
    </AnimatePresence>
  );
};
