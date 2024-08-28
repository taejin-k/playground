import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta name="description" content="Playground Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
