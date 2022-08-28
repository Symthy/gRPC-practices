// Buf Schema Registry にあるものを使う
import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { usePromiseClient } from "../../hooks/useClient";
import { ElizaPromiseForm } from "./ElizaPromiseForm";

export const ElizaFormByRemoteGen = () => {
  const client = usePromiseClient(ElizaService);

  return <ElizaPromiseForm client={client}></ElizaPromiseForm>;
};
