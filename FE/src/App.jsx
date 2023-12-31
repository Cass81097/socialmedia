import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Loading from "./components/common/Loading"

export default function App() {
  const { user, allUser } = useContext(AuthContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (allUser) {
      setIsDataLoaded(true);
    }
  }, [allUser]);

  if (!isDataLoaded) {
    return <Loading />;
  }

  return (
    <Router>
      <ProfileContextProvider user={user}>
        <Routes>
          <Route path="/loading" element={<Loading />} />
          <Route path="/404" element={<PageNotFound />} />
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
        </Routes>
      </ProfileContextProvider>
    </Router>
  );
}