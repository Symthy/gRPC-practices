import { useConnectError } from "../hooks/useConnectError";

export const ConnectErrorView = () => {
  const { isError, errorMessage } = useConnectError();
  return (
    <>
      {isError && (
        <div>
          <p>Error:</p>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </div>
      )}
    </>
  );
};
