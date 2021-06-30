import { useMutation, UseMutationOptions } from "react-query";
import { kubrick } from "./apiClient";
import NProgress from "nprogress";
import { AxiosError, AxiosResponse } from "axios";

export default function useDefaultMutation<TVariables = void, TData = unknown>(
  url: string,
  options?: UseMutationOptions<AxiosResponse<TData>, AxiosError, TVariables>
) {
  return useMutation<AxiosResponse<TData>, AxiosError, TVariables, unknown>(
    (payload) => kubrick.post<TData>(url, payload),
    {
      onMutate: () => {
        NProgress.start();
      },
      onSettled: () => {
        NProgress.done();
      },
      ...options,
    }
  );
}
