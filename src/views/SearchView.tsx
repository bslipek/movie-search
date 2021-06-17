import { AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import { useCallback } from "react";
import useSWR from "swr";
import { fadeDown } from "../animation";
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
  Search: [];
};

type Response = SuccessResponse | ErrorResponse;

const MotionInfo = 
    ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <motion.div
        key="info"
        layout
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeDown}
        className="absolute inset-x-0"
      >
        <div className="relative inline-block h-8 px-3 py-2 -m-4 bg-white bg-opacity-50 shadow-lg rounded-b-md top-7">
          <div className="relative inline-block px-5 py-2 text-gray-600 bg-white -top-7 rounded-b-md">
            {children}
          </div>
        </div>
      </motion.div>
    )

export const SearchView = () => {
  const [queryS, setQueryS] = useQueryParam("s", "");
  const [queryY, setQueryY] = useQueryParam("y", "");

  const onChange = useCallback(
    ({ s, y }) => {
      setQueryS(s);
      setQueryY(y);
    },
    [setQueryS, setQueryY]
  );

  const { data, error } = useSWR<Response>(`/${window.location.search}`);
  const isLoading = !error && !data;

  return (
    <CenteredLayout>
      <AnimateSharedLayout>
        <div
          className="sticky z-10 flex items-end justify-center w-full pointer-events-none"
          style={{
            paddingTop: "40vh",
            top: "-40.5vh",
          }}
        >
          <motion.div
            key="searchInputContainer"
            layout
            className="relative flex-1 p-3 text-center bg-white bg-opacity-50 rounded-md shadow-lg pointer-events-auto backdrop-filter backdrop-blur-md"
          >
            <SearchInput
              {...{ initialValue: { s: queryS, y: queryY }, onChange }}
            />
            {queryS && (
              <MotionInfo>
                {isLoading && "Loading..."}
                {data?.Response === "False" && queryS && data.Error}
                {data?.Response === "True" &&
                  `Total found: ${data.totalResults}`}
              </MotionInfo>
            )}
          </motion.div>
        </div>

        <MoviesList {...{ data: data?.Search }} />
      </AnimateSharedLayout>
    </CenteredLayout>
  );
};
