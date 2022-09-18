import { ConnectError } from "@bufbuild/connect-web";
import { ChangeEvent, FormEvent, useState } from "react";
import { useConnectError } from "../../hooks/useConnectError";
import { useSayMessages } from "../../hooks/useSayMessages";
import { SendForm } from "../SendForm";
import { useLocalClient } from "../../hooks/useClient";
import { ConnectErrorView } from "../ConnectErrorView";
import { FormProps } from "../../types";

export const GreetForm = ({ title }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  const client = useLocalClient();
  const { messages, setSendMessage, setRecvMessage } = useSayMessages();
  const { connectError, setConnectError, clearConnectError } =
    useConnectError();

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    clearConnectError();

    const headers = new Headers();
    headers.set("Acme-Token", "any");
    try {
      const response = await client.greet(
        { name: inputValue },
        { headers: headers }
      );
      setRecvMessage(response.greeting);
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
    <>
      <SendForm
        title={title}
        inputValue={inputValue}
        messages={messages}
        setSendValue={setSendValue}
        onSendMessage={onSendMessage}
      ></SendForm>
      <ConnectErrorView err={connectError} />
    </>
  );
};
