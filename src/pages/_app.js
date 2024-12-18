import "@/styles/globals.css";
import "@/styles/output.css";
import "@/styles/all.min.css";
import "@/styles/normaliz.css";
import Layout from "@/Components/Layout";
import { Provider } from "react-redux";
import { Store } from "@/RTK/Store";
import { useRouter } from "next/router";
import LayoutLogin from "@/Components/LayoutLogin";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const MainLayout =
    router.pathname.startsWith("/login") ||
    router.pathname.startsWith("/signup")
      ? LayoutLogin
      : Layout;
  return (
    <>
      <Provider store={Store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}
