import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Blood Source</title>
        <meta name="description" content="The Blood way, a way to help"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
