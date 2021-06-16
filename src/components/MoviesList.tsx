import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { Movie } from "../types";

const MovieListItem = motion(
  forwardRef(
    ({
      Title,
      Poster,
      Year,
      Type,
      ref,
    }: Movie & { ref: React.RefObject<any> }) => {
      return (
        <motion.div
          layout
          ref={ref}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.3 }}
          className="w-full px-1 my-1 md:w-1/3 lg:my-4 lg:px-4"
        >
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
  )
);

type Props = {
  data?: Array<Movie>;
};

export const MoviesList = ({ data = [] }: Props) => {
  return (
    <div className="flex flex-wrap -mx-1 mt-9 lg:-mx-4 sm:p-2">
      <AnimatePresence>
        {data.map((movie) => (
          <MovieListItem key={movie.imdbID} {...movie} />
        ))}
      </AnimatePresence>
    </div>
  );
};
