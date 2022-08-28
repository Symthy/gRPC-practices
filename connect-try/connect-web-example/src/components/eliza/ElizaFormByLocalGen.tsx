import { ElizaService } from "../../../gen/buf/connect/demo/eliza/v1/eliza_connectweb";
import { usePromiseClient } from "../../hooks/useClient";
import { ElizaPromiseForm } from "./ElizaPromiseForm";

export const ElizaFormByLocalGen = () => {
  const client = usePromiseClient(ElizaService);

  return <ElizaPromiseForm client={client}></ElizaPromiseForm>;
};
