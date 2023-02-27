import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Test from "../components/test";
import { useRouter } from "next/router";

export default function App({ Component, pageProps, session }) {
  const router = useRouter();
  console.log("bebe", router.pathname);
  if (
    router.pathname == "/" ||
    router.pathname == "/register/register" ||
    router.pathname == "register/register2" ||
    router.pathname == "register/register3" ||
    router.pathname == "register/register4"
  ) {
    return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <Test>
            <Component {...pageProps} />
          </Test>
        </Provider>
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Test>
          <Component {...pageProps} />
        </Test>
      </Provider>
    </SessionProvider>
  );
}
