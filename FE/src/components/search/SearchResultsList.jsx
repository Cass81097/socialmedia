import "../../styles/search-bar/SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { ProfileContext } from "../../context/ProfileContext";
import React, { useEffect, useState, useContext } from "react";

export const SearchResultsList = ({ results }) => {
  const { userProfile } = useContext(ProfileContext);
  const [resultList, setResultList] = useState(true);

  useEffect(() => {
    setResultList(true); // Show the results list when the component mounts
  }, []);

  useEffect(() => {
    setResultList(false); // Hide the results list when navigating to a new page
  }, [window.location.pathname]);

  const filteredResults = results.filter((result) => {
    const storedId = JSON.parse(localStorage.getItem("User"));
    return result?.id !== storedId?.id && userProfile[0]?.id !== result?.id;
  });

  return (
    <div className={`results-list ${resultList ? "" : "hidden"}`}>
      {filteredResults.map((result, id) => {
        return <SearchResult result={result.fullname} userId={result.id} key={id} />;
      })}
    </div>
  );
};