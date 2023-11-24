import React,{useState,useEffect} from 'react';
import debounce from 'lodash/debounce';
import '../styles/search.css';
import searchIcon from '../assets/images/icons8-search-48.png';
import useDebounce from '../hooks/useDebounce';
const SearchBar=(props) => {
    const {searchQuery,setSearchQuery}=props;
    const [showSuggestions,setShowSuggestions]=useState(false);
    const [debouncedQuery,setDebouncedQuery]=useState('');
    const [selectedSuggestionIndex,setSelectedSuggestionIndex]=useState(-1);
    const [loading,setLoading]=useState(false);
    const [suggestions,setSuggestions]=useState([]);
    const [error,setError]=useState(null);


    const handleChange=(event) => {
        const value=event.target.value;
        setSearchQuery(value);
    };

    const debouncedSearch=useDebounce(searchQuery,500);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setSuggestions([]);
            setShowSuggestions(false);
            const data=await fetch(
                `http://localhost:8080/autocomplete/${debouncedSearch}`
            ).then((res) => res.json());
            setSuggestions(data);
            setShowSuggestions(searchQuery!==''&&data.length>0);
            setLoading(false);
        }

        if(debouncedSearch) fetchData();
    },[debouncedSearch]);

    const handleSelectSuggestion=(suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        props.setClicked(true);
    };

    const handleKeyDown=(event) => {
        if(suggestions.length>0) {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) => (prevIndex>0? prevIndex-1:prevIndex));
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) =>
                        prevIndex<suggestions.length-1? prevIndex+1:prevIndex
                    );
                    break;
                case 'Enter':
                    event.preventDefault();
                    console.log(selectedSuggestionIndex)
                    if(selectedSuggestionIndex!==-1) {
                        handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
                    } else {
                        setShowSuggestions(false);
                        console.log(suggestions,showSuggestions)
                        setSuggestions([]);
                        props.setClicked(true);
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch(event.key) {
                case 'Enter':
                    event.preventDefault();
                    setShowSuggestions(false);
                    console.log(suggestions,showSuggestions)
                    setSuggestions([]);
                    props.setClicked(true);
                    break;
                default:
                    break;
            }
        }
    };

    // Clear suggestions when searchQuery becomes an empty string
    useEffect(() => {
        if(searchQuery==='') {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    },[searchQuery]);

    useEffect(() => {
        setSelectedSuggestionIndex(-1);
    },[showSuggestions]);

    return (
        <div className="search-bar-container" style={{width: `${props.width}`}}>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className={`suggestion ${showSuggestions? 'suggestion-expanded':'suggestion-hidden'}`}
                />
            </div>
            {showSuggestions&&(
                <ul className="suggestions-list">
                    {loading? (
                        <li>Loading...</li>
                    ):error? (
                        <li>Error fetching suggestions</li>
                    ):(
                        suggestions
                            .filter((suggestion) => suggestion.toLowerCase().includes(debouncedQuery.toLowerCase()))
                            .map((suggestion,index) => (
                                <li
                                    key={index}
                                    className={index===selectedSuggestionIndex? 'selected':''}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
