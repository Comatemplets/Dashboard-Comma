import Head from "next/head";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { MobileProvider } from "./Navbar/MobileProvider";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
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
          <Sidebar />
          <div className="wapper-page w-full min-h-screen pl-0 sm:pl-72 bg-background dark:bg-backgroundDark ">
            <Navbar />
            <main className="content min-h-screen  p-5">{children}</main>
            <Footer />
          </div>
        </div>
      </MobileProvider>
    </>
  );
}
