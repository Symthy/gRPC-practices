import { codeToString, ConnectError } from "@bufbuild/connect-web";
import { useMemo, useState } from "react";

export const useConnectError = () => {
  const [connectError, setConnectError] = useState<ConnectError | undefined>(
    undefined
  );
  const clearConnectError = () => {
    setConnectError(undefined);
  };
  return { connectError, setConnectError, clearConnectError };
};
