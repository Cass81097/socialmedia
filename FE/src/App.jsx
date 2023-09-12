import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ProfileContext } from "./context/ProfileContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ProfileContextProvider } from "./context/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  const { user, allUser } = useContext(AuthContext);

  return (
    <Router>
    <ProfileContextProvider user={user}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/home" element={user ? <Home /> : <Login />} />
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
    </ProfileContextProvider>
    </Router>
  );
}