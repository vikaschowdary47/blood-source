import Head from "next/head";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GlobalContextProvider } from "../context/GlobalState";

const firebaseConfig = {
  apiKey: "AIzaSyBn9oqPEiwwzXnFv9swp5J6qygLmJYzpDs",
  authDomain: "blood-souce.firebaseapp.com",
  projectId: "blood-souce",
  storageBucket: "blood-souce.appspot.com",
  messagingSenderId: "190986870146",
  appId: "1:190986870146:web:3c51ee356bf2c447e1039b",
  measurementId: "G-ZQF61GFMJ8"
};

const app = initializeApp(firebaseConfig);

type main = {
  Component:any,
  pageProps:object
}
function MyApp({ Component, pageProps }:main) {
  return (
    <>
      <Head>
        <meta name="description" content="The Blood way, a way to help"></meta>\
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
            integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
            crossOrigin="anonymous"
          />
        <title>Blood Source</title>

      </Head>
      <GlobalContextProvider>
      <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
