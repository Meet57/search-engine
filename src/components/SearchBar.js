import React,{useState,useEffect} from 'react';
import {debounce} from 'lodash';
import '../styles/search.css'; // Import your CSS file for styling
import searchIcon from '../assets/images/icons8-search-48.png';

const SearchBar=(props) => {
    const {searchQuery,setSearchQuery}=props;
    const [showSuggestions,setShowSuggestions]=useState(false);
    const [debouncedQuery,setDebouncedQuery]=useState('');
    const [selectedSuggestionIndex,setSelectedSuggestionIndex]=useState(-1);
    const suggestions=['React','Angular','Vue','JavaScript','CSS','HTML']; // Replace with your suggestions

    const handleChange=(event) => {
        const value=event.target.value;
        setSearchQuery(value);
        debounceSearch(value);
    };

    const debounceSearch=debounce((value) => {
        setDebouncedQuery(value);
        setShowSuggestions(value!==''&&suggestions.some((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase())));
    },300); // Adjust the debounce time as needed

    const handleSelectSuggestion=(suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        props.setClicked(true);
    };

    const handleClearInput=() => {
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handleKeyDown=(event) => {
        console.log(event)
        if(showSuggestions) {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) => (prevIndex>0? prevIndex-1:prevIndex));
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) => (prevIndex<suggestions.length-1? prevIndex+1:prevIndex));
                    break;
                case 'Enter':
                    if(selectedSuggestionIndex!==-1) {
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
    },[showSuggestions]);

    return (
        <div className={`search-bar-container ${props.width? "search-res-input":""}`}>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className={`suggestion ${showSuggestions? "suggestion-expanded":"suggestion-hidden"}`}
                />
            </div>
            {showSuggestions&&(
                <ul className="suggestions-list">
                    {suggestions
                        .filter((suggestion) => suggestion.toLowerCase().includes(debouncedQuery.toLowerCase()))
                        .map((suggestion,index) => (
                            <li
                                key={index}
                                className={index===selectedSuggestionIndex? 'selected':''}
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
