import type { AppProps } from "next/app";
import ReactModal from "react-modal";
import "../styles/globals.css";
import AuthProvider from "../components/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

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
