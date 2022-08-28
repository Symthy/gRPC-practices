import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { useCallbackClient, usePromiseClient } from "../../hooks/useClient";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSayMessages } from "../../hooks/useSayMessages";
import { ElizaForm } from "./ElizaForm";

export const ElizaCallbackForm = () => {
  const client = useCallbackClient(ElizaService);
  const [inputValue, setInputValue] = useState("");
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();

  const onSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);

    client.say({ sentence: inputValue }, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (!err) {
        setRecvMessage(res);
      }
    });
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
