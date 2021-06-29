import { useMutation } from "react-query";
import { kubrick } from "./apiClient";

export default function defaultMutationFn<T>(url: string, payload?: T) {
  useMutation((payload) => kubrick.post(url, payload));
}
