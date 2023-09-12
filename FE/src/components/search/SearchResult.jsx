  import "../../styles/search-bar/SearchResult.css"
  import React, { useEffect, useState, useContext } from "react";
  import { baseUrl, getRequest, postRequest } from "../../utils/services"
  import { Link, useNavigate } from "react-router-dom";
  import { ProfileContext } from "../../context/ProfileContext";

  export const SearchResult = ({ result, userId, onClickSearchResult }) => {
    const { userProfile, setUserProfile } = useContext(ProfileContext);

    const navigate = useNavigate();
    const [userSearched, setUserSearched] = useState([]);
    const [isSearchClosed, setIsSearchClosed] = useState(false); // Add new state

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

    const handleSearchUser = (res) => {
      navigate(`/${userSearched[0]?.username}`);
      onClickSearchResult()
      setUserProfile(res);
      setIsSearchClosed(true);
    };

    useEffect(() => {
      const handleCloseSearch = (event) => {
        // Check if the click is outside the search result component
        if (!event.target.closest(".search-result")) {
          setIsSearchClosed(true);
        }
      };

      // Attach the event listener when the search result is open
      if (!isSearchClosed) {
        document.addEventListener("click", handleCloseSearch);
      }

      // Detach the event listener when the search result is closed
      return () => {
        document.removeEventListener("click", handleCloseSearch);
      };
    }, [isSearchClosed]);

    return (
      <div className="search-result" onClick={handleSearchUser}>
        <div className="search-result-container">
          <img src={userSearched[0]?.avatar} alt="" />
          <p>{result}</p>
        </div>
      </div>
    );
  };