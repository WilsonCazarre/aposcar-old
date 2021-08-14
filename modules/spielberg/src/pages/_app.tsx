import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import ReactModal from "react-modal";
import AuthProvider from "../components/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

ReactModal.setAppElement("#__next");

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        toast((e as AxiosError).response?.data.detail);
      },
    },
    queries: {
      onError: (e) => {
        toast((e as AxiosError).response?.data.detail);
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-gray-900 h-screen text-gray-50">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
            <Toaster
              position="bottom-center"
              toastOptions={{
                className: "text-yellow",
                style: {
                  background: "var(--accent-color)",
                },
              }}
            />
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </div>
    </>
  );
}
export default MyApp;
