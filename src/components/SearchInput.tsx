import { useCallback } from "react";
import { useEffect } from "react";
import { useDebounce, useInput } from "../hooks";

const XIcon = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 border rounded-full right-5 top-2.5 text-gray-400 hover:font-bold hover:text-red-500 hover:border-red-500 hover:font-bold cursor-pointer"
  >
    X
  </div>
);

type Props = {
  className?: string;
  initialValue: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
};

export const SearchInput = ({ className, onChange, initialValue = {} }: Props) => {
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
  }, [onSChange, onYChange])

  const isS = debouncedS !== "";

  return (
    <div className="relative flex justify-center p-3 pr-12 text-center bg-white rounded-md">
      {isS && (
        <XIcon
          onClick={reset}
        />
      )}
      <div className="flex flex-1">
        {isS && (
          <label htmlFor="s" className="text-gray-400">
            Title:
          </label>
        )}
        <input
          type="text"
          name="s"
          className={`mr-2 w-full text-xl outline-none border-0 text-gray-700 text-center ${className} ${
            isS && "border-b"
          }`}
          placeholder="Search by title..."
          autoFocus
          {...{ value: s, onChange: onSChange }}
        ></input>
      </div>
      {isS && (
        <div>
          <label htmlFor="y" className="text-gray-400">
            Year:
          </label>
          <input
            type="text"
            name="y"
            className={` mr-2 border-b  text-lg top-0  outline-none w-30  text-gray-700 text-center ${className}`}
            {...{ value: y, onChange: onYChange }}
          ></input>
        </div>
      )}
    </div>
  );
};
