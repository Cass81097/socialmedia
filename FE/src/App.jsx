import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import { CometChatContextProvider } from "./context/CometChatContext";

export default function App() {

  return (
    <CometChatContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </Router>
      </AuthContextProvider>
    </CometChatContextProvider>
  );
}