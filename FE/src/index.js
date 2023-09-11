import { default as React } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CometChatContextProvider } from "./context/CometChatContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <CometChatContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CometChatContextProvider>
  // </React.StrictMode>,
);
