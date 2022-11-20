import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";
import Header from "../components/header/Header";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <div className="h-14 w-full" />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
