import { createConnectTransport } from "@bufbuild/connect-web";
import { logger } from "../interceptor/logger";

const ELIZA_URL = "https://demo.connect.build";
const LOCAL_SERVER_URL = "http://localhost:8080/connect";

// endpoint (通信先)
// gRPC-web を使用したい場合は createGrpcWebTransport を使う
export const transportForEliza = createConnectTransport({
  baseUrl: ELIZA_URL,
  interceptors: [logger],
});

export const transportForLocalServer = createConnectTransport({
  baseUrl: LOCAL_SERVER_URL,
  interceptors: [logger],
});
