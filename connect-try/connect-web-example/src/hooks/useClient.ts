import { useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";
import {
  CallbackClient,
  createCallbackClient,
  createPromiseClient,
  PromiseClient,
} from "@bufbuild/connect-web";
import { transportForEliza, transportForLocalServer } from "../config";
import { GreetService } from "../../gen/greet/v1/greet_connectweb";

export const usePromiseClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(
    () => createPromiseClient(service, transportForEliza),
    [service]
  );
};

export const useCallbackClient = <T extends ServiceType>(
  service: T
): CallbackClient<T> => {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(
    () => createCallbackClient(service, transportForEliza),
    [service]
  );
};

export const useLocalClient = (): PromiseClient<typeof GreetService> => {
  const service = GreetService;
  return useMemo(
    () => createPromiseClient(service, transportForLocalServer),
    [service]
  );
};
