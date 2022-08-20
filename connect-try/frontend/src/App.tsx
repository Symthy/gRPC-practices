import { Component, createResource, createSignal, Show } from "solid-js";

import styles from "./App.module.css";

/* added: start */
import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";

import { GreetService } from "./greet/v1/greet_connectweb";

// トランスポート作成
const transport = createConnectTransport({
  baseUrl: "/",
});

// クライアント作成
const client = createPromiseClient(GreetService, transport);

// サーバーリクエスト実行
const res = await client.greet({ name: "名前" });

async function greeter(name: string) {
  return client.greet({ name });
}
/* added: end */

const App: Component = () => {
  /* added: start */
  const [name, setName] = createSignal("bob");
  const [greet] = createResource(name, greeter);
  /* added: end */

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* added: start */}
        <input
          placeholder="Input your name."
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <p>greeting: {greet()?.greeting}</p>
        {/* added: end */}
      </header>
    </div>
  );
};

export default App;
