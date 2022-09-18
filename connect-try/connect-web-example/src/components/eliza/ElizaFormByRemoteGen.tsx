// Buf Schema Registry にあるものを使う
import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { usePromiseClient } from "../../hooks/useClient";
import { FormProps } from "../../types";
import { ElizaPromiseForm } from "./ElizaPromiseForm";

export const ElizaFormByRemoteGen = ({ title }: FormProps) => {
  const client = usePromiseClient(ElizaService);

  return <ElizaPromiseForm title={title} client={client}></ElizaPromiseForm>;
};
