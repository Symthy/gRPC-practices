import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { useCallbackClient } from "../../hooks/useClient";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSayMessages } from "../../hooks/useSayMessages";
import { SendForm } from "../SendForm";
import { ConnectErrorView } from "../ConnectErrorView";
import { ConnectError } from "@bufbuild/connect-web";
import { useConnectError } from "../../hooks/useConnectError";
import { FormProps } from "../../types";

export const ElizaCallbackForm = ({ title }: FormProps) => {
  const client = useCallbackClient(ElizaService);
  const [inputValue, setInputValue] = useState("");
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();
  const { connectError, setConnectError, clearConnectError } =
    useConnectError();

  const onSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    clearConnectError();

    client.say({ sentence: inputValue }, (err, res) => {
      if (err) {
        if (err instanceof ConnectError) {
          setConnectError(err);
        }
        console.log(err);
      }
      if (!err) {
        setRecvMessage(res.sentence);
      }
    });
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
