import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat, Nunito } from "@next/font/google";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { trpc } from "../utils/trpc";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PromoBanner from "../components/promoBanner/PromoBanner";
import ShoppingCartDrawer from "../components/shoppingCartDrawer/ShoppingCartDrawer";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={montserrat.variable}>
        <Header />
        <div className="h-14 w-full" />
        <Component {...pageProps} />
        <Footer />
        <PromoBanner />
        <ShoppingCartDrawer />
        <style global jsx>{`
          html {
            font-family: ${nunito.style.fontFamily}, ui-sans-serif, system-ui,
              -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }
        `}</style>
      </main>
      <Analytics />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
