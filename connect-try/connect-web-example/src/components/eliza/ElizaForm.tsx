import { ChangeEvent, FormEvent } from "react";
import { Message } from "../../types";

type ElizaFormProps = {
  inputValue: string;
  messages: Message[];
  setSendValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: FormEvent) => Promise<void> | void;
};

export const ElizaForm = ({
  inputValue,
  messages,
  setSendValue,
  onSendMessage,
}: ElizaFormProps) => {
  return (
    <>
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
