import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import {
  CallbackClient,
  ConnectError,
  PromiseClient,
} from "@bufbuild/connect-web";
import { ChangeEvent, FormEvent, useState } from "react";
import { useConnectError } from "../../hooks/useConnectError";
import { useSayMessages } from "../../hooks/useSayMessages";
import { FormProps } from "../../types";
import { ConnectErrorView } from "../ConnectErrorView";
import { SendForm } from "../SendForm";

type ElizaFormProps = {
  client: PromiseClient<typeof ElizaService>;
} & FormProps;

export const ElizaPromiseForm = ({ client, title }: ElizaFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();
  const { connectError, setConnectError, clearConnectError } =
    useConnectError();

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    clearConnectError();

    try {
      const response = await client.say({
        sentence: inputValue,
      });
      setRecvMessage(response.sentence);
    } catch (err) {
      // We have to verify err is a ConnectError before using it as one.
      if (err instanceof ConnectError) {
        setConnectError(err);
      }
      console.log(err);
    }
  };

  const setSendValue = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <>
      <SendForm
        title={title}
        inputValue={inputValue}
        messages={messages}
        setSendValue={setSendValue}
        onSendMessage={onSendMessage}
      />
      <ConnectErrorView err={connectError} />
    </>
  );
};
