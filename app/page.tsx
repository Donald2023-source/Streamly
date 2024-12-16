'use client'

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import Home from "./Pages/Home";

function Page() {
  return (
    <Provider store={store}>
        <Home/>
    </Provider>
  );
}

export default Page;
