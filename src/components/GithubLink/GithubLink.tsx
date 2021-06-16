import { motion } from "framer-motion";
import githubLogo from "./GitHub-Mark-Light-120px-plus.png";

type Props = {
  className?: string;
};

export const GithubLink = ({ className }: Props) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ x: 150, rotate: 90 }}
      animate={{ x: 0, rotate: 0, scale: 0.7 }}
      whileHover={{ scale: 1, rotate: -20 }}
    >
      <a
        href="https://github.com/bslipek/movie-search"
        rel="noreferrer"
        target="_blank"
      >
        <img src={githubLogo} alt="Github repo" />
      </a>
    </motion.div>
  );
};
