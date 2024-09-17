"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
      </body>
    </html>
  );
}
