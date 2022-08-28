import { SayResponse } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_pb";
import { useState } from "react";
import { Message } from "../types";

export const useSayMessages = () => {
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

  const setRecvMessage = (response: SayResponse) => {
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
