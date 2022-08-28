import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import {
  CallbackClient,
  ConnectError,
  PromiseClient,
} from "@bufbuild/connect-web";
import { ChangeEvent, FormEvent, useState } from "react";
import { useConnectError } from "../../hooks/useConnectError";
import { useSayMessages } from "../../hooks/useSayMessages";
import { ElizaForm } from "./ElizaForm";

type ElizaFormProps = {
  client: PromiseClient<typeof ElizaService>;
};

export const ElizaPromiseForm = ({ client }: ElizaFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();
  const { setConnectError, clearConnectError } = useConnectError();

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    clearConnectError();
    try {
      const response = await client.say({
        sentence: inputValue,
      });
      setRecvMessage(response);
    } catch (err) {
      // We have to verify err is a ConnectError before using it as one.
      if (err instanceof ConnectError) {
        setConnectError(err);
      }
    }
  };

  const setSendValue = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <ElizaForm
      inputValue={inputValue}
      messages={messages}
      setSendValue={setSendValue}
      onSendMessage={onSendMessage}
    ></ElizaForm>
  );
};
