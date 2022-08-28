import { Interceptor } from "@bufbuild/connect-web";

export const logger: Interceptor = (next) => async (req) => {
  const res = await next(req);
  console.log(`[request] sending to ${req.url}`);

  if (!res.stream) {
    console.log("[response] message:", res.message);
  }

  if (res.stream) {
    // to intercept (横取り) streaming response messages,
    // we override the read() method of the response
    return {
      ...res,
      async read() {
        const result = await res.read();
        console.log(
          "[response - stream] received:",
          result.value?.toJsonString()
        );
        return result;
      },
    };
  }

  return res;
};
