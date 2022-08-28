import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";
import { IntroduceResponse } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_pb";
import { CallbackClient } from "@bufbuild/connect-web";
import { Message } from "../types";
import { useState } from "react";

export const useIntroduceMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const setSendMessage = (inputValue: string) => {
    setMessages((prev) => [
      ...prev,
      {
        fromMe: true,
        message: inputValue,
      },
    ]);
  };

  const setRecvMessage = (response: IntroduceResponse) => {
    setMessages((prev) => [
      ...prev,
      {
        fromMe: false,
        message: response.sentence,
      },
    ]);
  };

  return { messages, setSendMessage, setRecvMessage };
};
