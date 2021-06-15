import { useEffect } from "react";
import { useDebounce, useInput } from "../hooks";

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
    <input
      type="text"
      className={`w-full p-3 text-xl bg-white rounded-md outline-none border-0 text-gray-700 text-center ${className}`}
      placeholder="Search by movie title..."
      autoFocus
      {...{ value, onChange }}
    ></input>
  );
};
