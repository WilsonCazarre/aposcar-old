import "../styles/globals.css";

import type { AppProps } from "next/app";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-yellow">
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
