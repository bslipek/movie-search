import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Movie } from "../types";

type Props = Movie & {
  close: () => void;
};

export const MoviePreview = ({ Poster, Title, Year, Type, imdbID, close}: Props) => {
    return createPortal(
      <motion.div
        className="fixed top-0 bottom-0 left-0 right-0 flex items-center bg-purple-900 bg-opacity-80 backdrop-filter backdrop-blur"
        onClick={close}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex flex-col justify-center w-4/5 mx-auto md:w-1/2 md:flex-row">
          <div className="fixed z-20 text-5xl text-white cursor-pointer top-5 right-5">
            X
          </div>
          <motion.img
            src={Poster}
            alt={Title}
            className="z-10 mx-auto shadow"
            initial={{ y: "50%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          />
          <motion.div
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center m-5 text-white md:items-start"
          >
            <span className="text-3xl lg:text-5xl">{Title}</span>
            <span>{Year}</span>
            <span>{Type}</span>
            <a
              target="_blank"
              rel="noreferrer"
              className="block w-full p-4 mt-2 text-xl text-center bg-yellow-400"
              onClick={(e) => e.stopPropagation()}
              href={`https://www.imdb.com/title/${imdbID}`}
            >
              SHOW
            </a>
          </motion.div>
        </div>
      </motion.div>,
      document.querySelector("#modal-root") as Element
    );
  }
