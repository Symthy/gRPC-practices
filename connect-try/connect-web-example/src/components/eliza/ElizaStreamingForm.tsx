import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { ConnectError } from "@bufbuild/connect-web";
import { FormEvent } from "react";
import { useCallbackClient } from "../../hooks/useClient";
import { useSendValue as useInputValue } from "../../hooks/useInputValue";
import { SendForm } from "../SendForm";
import { useIntroduceMessages } from "../../hooks/useIntroduceMessage";
import { ConnectErrorView } from "../ConnectErrorView";
import { useConnectError } from "../../hooks/useConnectError";

export const ElizaStreamingForm = () => {
  const client = useCallbackClient(ElizaService);
  const { inputValue, setInputValue, setInputValueFromChangeEvent } =
    useInputValue();
  const { messages, setSendMessage, setRecvMessage } = useIntroduceMessages();
  const { connectError, setConnectError, clearConnectError } =
    useConnectError();

  const onSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setInputValue("");
    setSendMessage(inputValue);
    clearConnectError();

    client.introduce(
      { name: inputValue },
      (res) => {
        setRecvMessage(res);
      },
      (err?: ConnectError) => {
        if (err) {
          if (err instanceof ConnectError) {
            setConnectError(err);
          }
          console.error(err);
        }
      }
    );
  };

  return (
    <>
      <SendForm
        inputValue={inputValue}
        messages={messages}
        setSendValue={setInputValueFromChangeEvent}
        onSendMessage={onSendMessage}
      />
      <ConnectErrorView err={connectError} />
    </>
  );
};
