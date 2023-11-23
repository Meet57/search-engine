import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import "../styles/search.css"; // Import your CSS file for styling
import searchIcon from '../assets/images/icons8-search.svg';
import locationIcon from '../assets/images/location.png';
import { Input, Select } from "antd";
import Search from "antd/es/input/Search";

const SearchBar = (props) => {
  const { searchQuery, setSearchQuery } = props;
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestions = ["React", "Angular", "Vue", "JavaScript", "CSS", "HTML"];

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    debounceSearch(value);
  };

  const debounceSearch = debounce((value) => {
    setDebouncedQuery(value);
    setShowSuggestions(
      value !== "" &&
        suggestions.some((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
    );
  }, 300);

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    props.setClicked(true);
  };

  const handleClearInput = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (event) => {
    console.log(event);
    if (showSuggestions) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          setSelectedSuggestionIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedSuggestionIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
          );
          break;
        case "Enter":
          if (selectedSuggestionIndex !== -1) {
            handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [showSuggestions]);

  return (
    <div
      className={`search-bar-container ${
        props.width ? "search-res-input" : ""
      }`}
    >
      <div className="search-input-wrapper flex justify-between align-middle align-center">
        <Search
          type="text"
          size="large"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          suffixIcon={<img src={searchIcon} style={{maxHeight: "100%"}} />}
          style={{ width: "100%" }}
          className={`suggestion ${
            showSuggestions ? "suggestion-expanded" : "suggestion-hidden"
          }`}
        />
      </div>
      {showSuggestions && (
        <ul className="suggestions-list">
          {suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
            .map((suggestion, index) => (
              <li
                key={index}
                className={index === selectedSuggestionIndex ? "selected" : ""}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
