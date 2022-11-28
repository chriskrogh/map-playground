import type { AppProps } from "next/app";

import "../src/components/GoogleMap/google-maps.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
