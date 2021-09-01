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
import { NextPage } from "next";
import RoomProvider from "../components/rooms/RoomProvider";

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
        toast((e as AxiosError).message);
      },
    },
    queries: {
      onError: (e) => {
        toast((e as AxiosError).response?.data.detail);
      },
    },
  },
});

export type PageComponent<T> = NextPage<T> & { ws?: boolean };

function MyApp({ Component, pageProps }: AppProps) {
  if (
    typeof window === "undefined" &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col bg-gray-900 h-screen text-gray-50 overflow-hidden">
        <QueryClientProvider client={queryClient}>
          <RoomProvider>
            <AuthProvider>
              <title>Aposcar</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
              />
              <link
                rel="icon"
                href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏆</text></svg>"
              />
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
          </RoomProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </div>
    </>
  );
}
export default MyApp;
