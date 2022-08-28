import {
  createConnectTransport,
  createPromiseClient,
  PromiseClient,
  Transport,
} from "@bufbuild/connect-web";

// Buf Schema Registry にあるものを使う
import { ElizaService } from "@buf/bufbuild_connect-web_bufbuild_eliza/buf/connect/demo/eliza/v1/eliza_connectweb";

// endpoint (通信先)
const transport: Transport = createConnectTransport({
  baseUrl: "https://demo.connect.build",
});

export const elizaPromiseClient: PromiseClient<typeof ElizaService> =
  createPromiseClient<typeof ElizaService>(ElizaService, transport);
