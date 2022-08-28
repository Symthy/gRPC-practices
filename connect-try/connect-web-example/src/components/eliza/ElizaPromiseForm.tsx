import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { CallbackClient, PromiseClient } from "@bufbuild/connect-web";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSayMessages } from "../../hooks/useSayMessages";
import { ElizaForm } from "./ElizaForm";

type ElizaFormProps = {
  client: PromiseClient<typeof ElizaService>;
};

export const ElizaPromiseForm = ({ client }: ElizaFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    const response = await client.say({
      sentence: inputValue,
    });
    setRecvMessage(response);
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
