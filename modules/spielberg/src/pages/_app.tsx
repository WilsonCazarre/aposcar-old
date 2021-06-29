import type { AppProps } from "next/app";
import ReactModal from "react-modal";
import "../styles/globals.css";
import AuthProvider from "../components/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-gray-900 h-screen text-gray-50">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </>
  );
}
export default MyApp;
