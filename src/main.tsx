import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@twilio-paste/core/theme";
import App from "./App";
import Providers from "./providers";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Theme.Provider theme="default">
      <Providers>
        <App />
      </Providers>
    </Theme.Provider>
  );
} else {
  console.error("Root element not found");
}
