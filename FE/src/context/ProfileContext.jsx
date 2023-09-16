import React, { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { get } from "jquery";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children, user }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUser] = useState([])
  const [userProfile, setUserProfile] = useState([]);
  const [countFriend, setCountFriend] = useState([]);
  const [checkFriendStatus, setCheckFriendStatus] = useState(null);

  const [listFriend, setListFriend] = useState([])

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

  useEffect(() => {
    const fetchCountFriend = async () => {
      try {
        const storedUser = localStorage.getItem('User');
        if (storedUser && username) {
          const response = await getRequest(`${baseUrl}/friendShips/listFriend/username/${username}`);
          setCountFriend(response);
        } else return;
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };
    fetchCountFriend();
  }, [username]);

  //   useEffect(() => {
  //     const findFriend = async () => {
  //         try {
  //           if (userProfile?.length > 0) {
  //             const response = await getRequest(`${baseUrl}/friendShips/listFriend/id/${userProfile[0]?.id}`);
  //             // for (let i = 0; i < response.data.length; i++) {
  //             //     const response1 = await getRequest(`${baseUrl}/friendShips/mutual-friends/${user?.id}/${response?.data[i].id}`)
  //             //     response.data[i] = { ...response.data[i], matualFriends: response1.data.length }
  //             // }
  //             setListFriend(response);
  //           } else return;
  //         } catch (error) {
  //             console.log(error);
  //         }
  //     };
  //     findFriend();
  // }, []);

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
    <ProfileContext.Provider value={{ userProfile, socket, setUserProfile, checkFriendStatus, fetchUserProfile, countFriend, listFriend }}>
      {children}
    </ProfileContext.Provider>
  );
};