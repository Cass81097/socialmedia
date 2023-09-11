import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
  const { user, allUser } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {allUser?.length > 0 &&
          allUser.map((username) => (
            <Route
              key={username}
              path={`/${username}`}
              element={<Profile user={username} />}
            />
          ))}

        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}