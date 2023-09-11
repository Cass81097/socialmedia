import React, { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children, user }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([])
  const [userProfile, setUserProfile] = useState([]);
  const domain = window.location.pathname.split("/")[1];
  const username = domain || "";

  // console.log(onlineUsers, "onlineUsers");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/find/${username}`);
        setUserProfile(response);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Socket
  useEffect(() => {

    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return () => {
      newSocket.disconnect();
    }
  }, [user])

  // Add online user

  useEffect(() => {

    if (socket === null) return;
    socket.emit("addNewUser", user?.id)
    socket.on("getOnlineUsers", (res) => {
      setOnlineUser(res)
    })

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket])


  return (
      <ProfileContext.Provider value={{userProfile, socket}}>
        {children}
      </ProfileContext.Provider>
  );
};