import Head from "next/head";
import { MobileProvider } from "./Navbar/MobileProvider";
import Footer from "./Footer/Footer";

export default function LayoutLogin({ children }) {
  return (
    <>
      <MobileProvider>
        <Head>
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          />
        </Head>
        <div className="Dashboard-content flex">
          <div className="wapper-page w-full min-h-screen  bg-background dark:bg-backgroundDark ">
            <main className="content min-h-screen  p-5">{children}</main>
            <Footer />
          </div>
        </div>
      </MobileProvider>
    </>
  );
}
