import React, { useState } from "react";
import { isString } from "../types";

export const useInput = (defaultValue: string = "") => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    setValue(isString(e) ? e : e.target.value);
  };

  return {
    value,
    onChange,
  };
};
