import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { ProfileContextProvider } from "./context/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function App() {
  const { user, allUser } = useContext(AuthContext);

  return (
    <ProfileContextProvider user={user}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Profile /> : <Login />} />
          <Route path="/login" element={user ? <Profile /> : <Login />} />
          {allUser?.length > 0 &&
            allUser.map((username) => (
              <Route
                key={username}
                path={`/${username}`}
                element={<Profile user={username} />}
              />
            ))}
          {/* <Route path={"/password"} element={<EditPassword></EditPassword>}></Route> */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </ProfileContextProvider>
  );
}