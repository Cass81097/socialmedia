import "../../styles/search-bar/SearchResult.css"
import React, { useEffect, useState, useContext } from "react";
import { baseUrl, getRequest, postRequest } from "../../utils/services"
import { Link, useNavigate } from "react-router-dom";

export const SearchResult = ({ result, userId }) => {
  const navigate = useNavigate();
  const [userSearched, setUserSearched] = useState([])

  console.log(userSearched[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(`${baseUrl}/users/find/id/${userId}`);
        setUserSearched(response);
      } catch (error) {
        console.error("Error checking friend status:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleSearchUser = () => {
    window.location.href = `/${userSearched[0].username}`;
  };

  return (
    <div className="search-result" onClick={handleSearchUser}>
      <div className="search-result-container">
        <img src={userSearched[0]?.avatar} alt="" />
        <p>{result}</p>
      </div>
    </div>
  );
};
