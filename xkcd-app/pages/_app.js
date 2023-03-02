import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { I18NContextProvider } from "@/context/i18n";

export default function App({ Component, pageProps }) {
  return (
    <I18NContextProvider>
      <NextUIProvider>
        <Head>
          <link
            rel="icon"
            href="/favicon.ico"
          />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NContextProvider>
  );
}
