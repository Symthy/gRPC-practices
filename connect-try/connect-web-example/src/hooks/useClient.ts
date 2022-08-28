import { useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";
import {
  CallbackClient,
  createCallbackClient,
  createPromiseClient,
  PromiseClient,
} from "@bufbuild/connect-web";
import { transport } from "../config";

export const usePromiseClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(() => createPromiseClient(service, transport), [service]);
};

export const useCallbackClient = <T extends ServiceType>(
  service: T
): CallbackClient<T> => {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(() => createCallbackClient(service, transport), [service]);
};
