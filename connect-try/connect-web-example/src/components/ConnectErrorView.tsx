import { codeToString, ConnectError } from "@bufbuild/connect-web";

type ConnectErrorViewProps = {
  err?: ConnectError;
};

export const ConnectErrorView = ({ err }: ConnectErrorViewProps) => {
  console.log("lood error view");
  const isError = !!err;
  const errorMessage = isError
    ? `Code: ${err.code} - ${codeToString(err.code)} | Message: ${
        err.rawMessage
      }`
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
