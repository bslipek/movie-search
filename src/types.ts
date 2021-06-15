export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export const isString = (e: string | any): e is string => typeof e === "string";
