import React, { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children, user }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([])
  const [userProfile, setUserProfile] = useState([]);
  const [checkFriendStatus, setCheckFriendStatus] = useState(null);
  const domain = window.location.pathname.split("/")[1];
  const username = domain || "";

  const fetchUserProfile = async () => {
    try {
      const storedUser = localStorage.getItem('User');
      if (storedUser && username) {
        const response = await getRequest(`${baseUrl}/users/find/${username}`);
        setUserProfile(response);
      } else {
        return;
      }
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  useEffect(() => {
    if (checkFriendStatus?.status === "block") {
      navigate("/404");
    }
  }, [checkFriendStatus, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = localStorage.getItem('User');
        if (storedUser && username) {
          const response = await getRequest(`${baseUrl}/users/find/${username}`);
          setUserProfile(response);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };
    fetchUserProfile();
  }, [username]);

  useEffect(() => {
    const fetchFriendStatus = async () => {
      try {
        const storedUser = localStorage.getItem('User');
        if (storedUser && username) {
          const response = await getRequest(`${baseUrl}/friendShips/checkStatusByUserId/${user?.id}/${userProfile[0]?.id}`);
          setCheckFriendStatus(response);
        } else return;
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };
    fetchFriendStatus();
  }, [user, userProfile]);

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
    <ProfileContext.Provider value={{ userProfile, socket, setUserProfile, checkFriendStatus, fetchUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};