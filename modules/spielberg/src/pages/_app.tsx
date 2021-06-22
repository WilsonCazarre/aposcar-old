import type { AppProps } from "next/app";
import ReactModal from "react-modal";
import "../styles/globals.css";

ReactModal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-900 h-screen text-gray-50">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
