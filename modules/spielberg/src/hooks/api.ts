import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { BaseError, Category, Indication } from "../types/interfaces";

const retryableCodes = [408, 502, 503, 504];

export const api = axios.create({
  baseURL: "https://aposcar.herokuapp.com/",
});

const fetchData = async (url: string) => {
  const res = await api.get(url);
  return res.data;
};

const fetchMultipleData = async (urls: string[]) => {
  const requests = urls.map((value) => fetchData(value));
  return await Promise.all(requests);
};

const shouldRetry = (failureCount: number, error: AxiosError) =>
  retryableCodes.includes(error.response?.status ?? 0);

export const useCategories = () => {
  return useQuery<Category[], AxiosError<BaseError>>(
    "categories",
    () => fetchData("/categories/"),
    {
      retry: shouldRetry,
    }
  );
};

export const useCategory = (name: string) => {
  return useQuery<Category, AxiosError<BaseError>>(
    ["category", name],
    () => fetchData(`/categories/${name}/`),
    {
      retry: shouldRetry,
    }
  );
};

export const useIndications = (category?: Category) => {
  return useQuery<Indication[], AxiosError<BaseError>>(
    ["indications", category?.name],
    () => fetchMultipleData(category?.indications ?? []),
    { retry: shouldRetry, enabled: !!category }
  );
};
