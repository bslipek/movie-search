import { GithubLink } from "../GithubLink";

type Props = {
  children?: React.ReactNode;
};

export const CenteredLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-full bg-red bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <GithubLink className="fixed scale-50 top-3 right-3" />
      <div className="container max-w-screen-lg mx-auto md:px-4">
        {children}
      </div>
    </div>
  );
};
