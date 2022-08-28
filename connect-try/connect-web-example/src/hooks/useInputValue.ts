import { ChangeEvent, useState } from "react";

export const useSendValue = () => {
  const [inputValue, setInputValue] = useState("");
  const setInputValueFromChangeEvent = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return { inputValue, setInputValue, setInputValueFromChangeEvent };
};
