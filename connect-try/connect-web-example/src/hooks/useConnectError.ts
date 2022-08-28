import { codeToString, ConnectError } from "@bufbuild/connect-web";
import { useState } from "react";

export const useConnectError = () => {
  const [connectError, setConnectError] = useState<ConnectError | undefined>(
    undefined
  );
  const clearConnectError = () => {
    setConnectError(undefined);
  };
  const isError = !!connectError;
  const errorMessage = isError
    ? `${codeToString(connectError.code)} | ${connectError.rawMessage}`
    : "";
  return { isError, errorMessage, setConnectError, clearConnectError };
};
