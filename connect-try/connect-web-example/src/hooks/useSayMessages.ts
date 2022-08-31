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

  const setRecvMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        fromMe: false,
        message: message,
      },
    ]);
  };

  return { messages, setSendMessage, setRecvMessage };
};
