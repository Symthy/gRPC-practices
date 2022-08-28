import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { ConnectError } from "@bufbuild/connect-web";
import { FormEvent, useState } from "react";
import { useCallbackClient, usePromiseClient } from "../../hooks/useClient";
import { useSayMessages } from "../../hooks/useSayMessages";
import { useSendValue as useInputValue } from "../../hooks/useInputValue";
import { ElizaForm } from "./ElizaForm";
import { useIntroduceMessages } from "../../hooks/useIntroduceMessage";

export const ElizaStreamingForm = () => {
  const client = useCallbackClient(ElizaService);
  const { inputValue, setInputValue, setInputValueFromChangeEvent } =
    useInputValue();
  const { messages, setSendMessage, setRecvMessage } = useIntroduceMessages();
  const onSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    client.introduce(
      { name: inputValue },
      (res) => {
        setRecvMessage(res);
      },
      (err?: ConnectError) => {
        if (err) {
          console.error(err);
        }
      }
    );
  };

  return (
    <ElizaForm
      inputValue={inputValue}
      messages={messages}
      setSendValue={setInputValueFromChangeEvent}
      onSendMessage={onSendMessage}
    ></ElizaForm>
  );
};
