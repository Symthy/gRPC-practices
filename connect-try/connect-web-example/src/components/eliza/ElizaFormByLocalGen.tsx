import { ElizaService } from "../../../gen/buf/connect/demo/eliza/v1/eliza_connectweb";
import { usePromiseClient } from "../../hooks/useClient";
import { FormProps } from "../../types";
import { ElizaPromiseForm } from "./ElizaPromiseForm";

export const ElizaFormByLocalGen = ({ title }: FormProps) => {
  const client = usePromiseClient(ElizaService);

  return <ElizaPromiseForm title={title} client={client}></ElizaPromiseForm>;
};
