import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/search-bar/SearchBar.css";

export const SearchBar = ({ setResults, results }) => {
  const [input, setInput] = useState("");
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    setHasResults(results.length > 0);
  }, [results]);

  useEffect(() => {
    setInput(""); 
  }, [window.location.pathname]);

  const fetchData = (value) => {
    fetch("http://localhost:5000/users/")
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter((user) => {
          return (
            value &&
            user &&
            user.fullname &&
            (user.fullname.toLowerCase().includes(value) ||
              user.fullname.includes(value))
          );
        });
        setResults(filteredResults);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className={`input-wrapper ${hasResults ? "with-results" : ""}`}>
      <FaSearch className="icon-search" />
      <input
        placeholder="Tìm kiếm trên Facebook"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};