import React,{useState,useEffect} from 'react';
import {message} from 'antd';
import '../styles/SearchBar.css';
import useDebounce from '../hooks/useDebounce';
import {useAppState} from '../Context/GlobalContex';

const SearchBar=(props) => {
    const {
        searchQuery,
        setSearchQuery,
        setSearchedBefore,
        showSuggestions,
        setShowSuggestions,
        suggestions,
        setSuggestions,
        jobs,
        setJobs,
        searchedBefore,
        spellCheckedSuggestion,
        setSpellCheckedSuggestion,
        loadingJobs,
        setLoadingJobs,
        setCloseSpellCheck
    }=useAppState();

    const [debouncedQuery,setDebouncedQuery]=useState('');
    const [selectedSuggestionIndex,setSelectedSuggestionIndex]=useState(-1);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [hasQueryChanged,setHasQueryChanged]=useState(false);


    const spellCheck=async (query) => {
        try {
            setSpellCheckedSuggestion('');
            setCloseSpellCheck(true);
            setLoadingJobs(true);

            const regex=/[^a-zA-Z- ]/g;

            if(regex.test(query)) {
                message.error('Error: Input contains invalid characters. Only letters are allowed.');
                setLoadingJobs(false);
                setCloseSpellCheck(false);
                return false;
            }

            if(query.trim()==="") {
                message.error('Error: Input contains invalid characters. Only letters are allowed.');
                setLoadingJobs(false);
                setCloseSpellCheck(false);
                return false;
            }
            // Use replace to remove all other symbols
            const processedQuery=query.replace(regex,'');

            const spellCheckResponse=await fetch(`http://localhost:8080/spellcheck/${processedQuery}`);
            if(!spellCheckResponse.ok) {
                throw new Error('Error checking spelling');
            }
            const spellCheckData=await spellCheckResponse.text();
            if(searchQuery.toLowerCase().trim()!==spellCheckData.toLowerCase().trim()) {
                setSpellCheckedSuggestion(spellCheckData);
            }
            else {
                setSpellCheckedSuggestion('');
            }
            // If you want to call another API based on the spell check result:
            await searchJobPosting(spellCheckData);

        } catch(spellCheckError) {
            console.error('Error checking spelling:',spellCheckError);
        }
    };

    const searchJobPosting=async (spellCheckData) => {
        try {
            // Use spellCheckData to determine the parameters for the other API call
            const spellCheckResponse=await fetch(`http://localhost:8080/search/jobposting/${spellCheckData}`);

            if(!spellCheckResponse.ok) {
                throw new Error('Error calling another API');
            }

            const data=await spellCheckResponse.json();
            if(data.length<1) {
                setSearchedBefore(() => {
                    if(searchedBefore) {
                        return true;
                    } else {
                        return false;
                    }
                });
                message.error("Couldn't find any jobs with provided search query!");
            }
            setJobs(data);
            setLoadingJobs(false);
        } catch(error) {
            setLoadingJobs(false);
            setCloseSpellCheck(false);
            console.error('Error calling another API:',error);
        }
    };



    const handleChange=(event) => {
        const value=event.target.value;
        setHasQueryChanged(true);
        setSearchQuery(value);
    };

    const debouncedSearch=useDebounce(searchQuery,500);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setSuggestions([]);
            setShowSuggestions(false);
            setHasQueryChanged(false);
            try {
                const response=await fetch(
                    `http://localhost:8080/autocomplete/${debouncedSearch}`
                );
                if(!response.ok) {
                    throw new Error('Error fetching suggestions');
                }
                const data=await response.json();
                setSuggestions(data);
                setShowSuggestions(searchQuery!==''&&data.length>0);
                setLoading(false);
            } catch(error) {
                setError('Error fetching suggestions');
                setLoading(false);
            }
        }

        if(hasQueryChanged&&debouncedSearch) fetchData();

    },[debouncedSearch,searchQuery,hasQueryChanged]);

    const handleSelectSuggestion=(suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        setSearchedBefore(true);
        spellCheck(suggestion);
    };

    const handleKeyDown=(event) => {
        if(suggestions.length>0) {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) =>
                        prevIndex>0? prevIndex-1:prevIndex
                    );
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) =>
                        prevIndex<suggestions.length-1? prevIndex+1:prevIndex
                    );
                    break;
                case 'Enter':
                    event.preventDefault();
                    if(selectedSuggestionIndex!==-1) {
                        handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
                    } else {
                        setShowSuggestions(false);
                        setSuggestions([]);
                        setSearchedBefore(true);
                        spellCheck(searchQuery);
                        setHasQueryChanged(false);
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch(event.key) {
                case 'Enter':
                    event.preventDefault();
                    spellCheck(searchQuery);
                    setShowSuggestions(false);
                    setSuggestions([]);

                    setSearchedBefore(() => {
                        if(searchQuery.trim()==="") {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    setHasQueryChanged(false);
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

    // Set Selected suggestion to index -1 whenever suggestions are updated.
    useEffect(() => {
        setSelectedSuggestionIndex(-1);
        const suggestionsList=document.querySelector('.suggestions-list');
        if(suggestionsList) {
            if(showSuggestions) {
                suggestionsList.classList.add('expanded');
            } else {
                suggestionsList.classList.remove('expanded');
            }
        }
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
                    className={`suggestion ${showSuggestions? 'suggestion-expanded':'suggestion-hidden'
                        }`}
                />
            </div>
            {showSuggestions&&(
                <ul className="suggestions-list">
                    {loading? (
                        <li>Loading...</li>
                    ):error? (
                        <li>{error}</li>
                    ):(
                        suggestions
                            .filter((suggestion) =>
                                suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
                            )
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
