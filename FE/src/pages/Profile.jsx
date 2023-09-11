import React, { useEffect, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export default function Profile() {
  const location = useLocation();
  const domain = location.pathname.split("/")[1]; // Extract desired part from path
  const username = domain || ""; // If domain is empty, set username to empty string

  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/find/${username}`);
        setUserProfiles(response); // Assuming the response contains an array of user profiles
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfiles();
  }, []);

  console.log(userProfiles);

  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Button onClick={handleClick}>
        <BiPowerOff />
      </Button>
      {userProfiles.map((userProfile) => (
        <div key={userProfile.id}>
          <div>{userProfile.id}</div>
          <div>{userProfile.username}</div>
          <div>{userProfile.fullname}</div>
        </div>
      ))}
    </>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;