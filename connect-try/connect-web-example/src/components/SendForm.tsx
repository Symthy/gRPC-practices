import { ChangeEvent, FormEvent } from "react";
import { Message } from "../types";
import { ConnectErrorView } from "./ConnectErrorView";

type SendFormProps = {
  title: string;
  inputValue: string;
  messages: Message[];
  setSendValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: FormEvent) => Promise<void> | void;
};

export const SendForm = ({
  title,
  inputValue,
  messages,
  setSendValue,
  onSendMessage,
}: SendFormProps) => {
  console.log("load send form");
  return (
    <>
      <p>{title}</p>
      <ol>
        {messages.map((msg, index) => (
          <li key={index}>
            {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
          </li>
        ))}
      </ol>
      <form onSubmit={onSendMessage}>
        <input value={inputValue} onChange={setSendValue} />
        <button type="submit">Send</button>
      </form>
    </>
  );
};
