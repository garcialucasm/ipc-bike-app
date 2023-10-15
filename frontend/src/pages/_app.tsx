import type { AppProps } from "next/app";
import "../styles/globals.css";

{
  /* temp bootstrap link */
}
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossOrigin="anonymous"
></link>;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {" "}
      <Component {...pageProps} />
    </>
  );
}
