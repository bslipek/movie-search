import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback } from "react";
import { useEffect } from "react";
import { fadeDown, fadeLeft, fadeRight } from "../animation";
import { useDebounce, useInput } from "../hooks";

type Props = {
  className?: string;
  initialValue: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
};

export const SearchInput = ({
  className,
  onChange,
  initialValue = {},
}: Props) => {
  const { value: s, onChange: onSChange } = useInput(initialValue.s || "");
  const debouncedS = useDebounce(s);

  const { value: y, onChange: onYChange } = useInput(initialValue.y || "");
  const debouncedY = useDebounce(y);

  useEffect(() => {
    onChange({ s: debouncedS, y: debouncedY });
  }, [debouncedS, debouncedY, onChange]);

  const reset = useCallback(() => {
    onSChange("");
    onYChange("");
  }, [onSChange, onYChange]);

  const isS = debouncedS !== "";

  return (
    <motion.div
      key="searchInput"
      layout
      className="relative flex flex-col justify-center p-3 pr-12 text-center bg-white rounded-md md:flex-row"
    >
      <AnimatePresence>
        <motion.div key="titleFieldContainer" className="flex flex-1">
          {isS && (
            <motion.label
              key="sLabel"
              htmlFor="s"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeRight}
              className="text-gray-400"
            >
              Title:
            </motion.label>
          )}
          <motion.input
            key="titleField"
            layout
            transition={{ type: "spring", bounce: 0 }}
            type="text"
            name="s"
            className={`mr-2 w-full text-xl outline-none border-0 text-gray-700 text-center ${className} ${
              isS && "border-b"
            }`}
            placeholder="Search by title..."
            autoFocus
            autoComplete="off"
            {...{ value: s, onChange: onSChange }}
          ></motion.input>
        </motion.div>
        {isS && (
          <Fragment key="yearFieldContainer">
            <motion.div
              key="yearField"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeDown}
            >
              <label htmlFor="y" className="text-gray-400">
                Year:
              </label>
              <input
                type="text"
                name="y"
                className={` mr-2 border-b  text-lg top-0  outline-none w-30  text-gray-700 text-center ${className}`}
                {...{ value: y, onChange: onYChange }}
                autoComplete="off"
              ></input>
            </motion.div>
            <motion.div
              key="xIcon"
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.2, rotate: -20 }}
              variants={fadeLeft}
              onClick={reset}
              className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 border rounded-full right-5 top-2.5 text-gray-400 hover:font-bold hover:text-red-500 hover:border-red-500 hover:font-bold cursor-pointer"
            >
              X
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
