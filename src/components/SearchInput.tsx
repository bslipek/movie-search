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
  onChange?: (value: string) => void;
  initialValue?: string;
};

export const SearchInput = ({
  className,
  onChange: _onChange = () => {},
  initialValue = "",
}: Props) => {
  const { value, onChange } = useInput(initialValue);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    _onChange(debouncedValue);
  }, [debouncedValue, _onChange]);

  return (
    <div className="relative py-3 text-center bg-white rounded-md">
      {value !== "" && <XIcon onClick={() => onChange('')}    />}
      <input
        type="text"
        className={`w-full px-10 text-xl  outline-none border-0 text-gray-700 text-center ${className}`}
        placeholder="Search by movie title..."
        autoFocus
        {...{ value, onChange }}
      ></input>
    </div>
  );
};
