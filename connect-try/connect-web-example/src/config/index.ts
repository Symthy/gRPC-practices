import { createConnectTransport } from "@bufbuild/connect-web";
import { logger } from "../interceptor/logger";

export const ELIZA_URL = "https://demo.connect.build";

// endpoint (通信先)
// gRPC-web を使用したい場合は createGrpcWebTransport を使う
export const transport = createConnectTransport({
  baseUrl: ELIZA_URL,
  interceptors: [logger],
});
