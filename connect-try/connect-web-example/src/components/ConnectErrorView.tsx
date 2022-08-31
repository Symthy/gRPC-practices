import { codeToString, ConnectError } from "@bufbuild/connect-web";
import { useConnectError } from "../hooks/useConnectError";

type ConnectErrorViewProps = {
  err: ConnectError | undefined;
};

export const ConnectErrorView = ({ err }: ConnectErrorViewProps) => {
  console.log("lood error view");
  const isError = !!err;
  const errorMessage = isError
    ? `Code: ${codeToString(err.code)} | Message: ${err.rawMessage}`
    : "";
  return (
    <>
      {isError && (
        <div>
          <span style={{ color: "red" }}>{`[Error]`} </span>
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
};
