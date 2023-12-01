import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useAppState } from '../Context/GlobalContex';
import '../styles/SearchBar.css';
import useDebounce from '../hooks/useDebounce';
import searchIcon from '../assets/images/icons8-search.svg';

const SearchBar = (props) => {
    const {
        searchQuery,
        setSearchQuery,
        setSearchedBefore,
        showSuggestions,
        setShowSuggestions,
        suggestions,
        setSuggestions,
        setJobs,
        searchedBefore,
        setSpellCheckedSuggestion,
        setLoadingJobs,
        setCloseSpellCheck
    } = useAppState();

    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasQueryChanged, setHasQueryChanged] = useState(false);

    const spellCheck = async (query) => {
        try {
            setSpellCheckedSuggestion('');
            setCloseSpellCheck(true);
            setLoadingJobs(true);

            const regex = /[^a-zA-Z- ]/g;

            if (regex.test(query) || query.trim() === '') {
                message.error(
                    'Error: Input contains invalid characters. Only letters are allowed.'
                );
                setLoadingJobs(false);
                setCloseSpellCheck(false);
                return false;
            }

            const processedQuery = query.replace(regex, '');

            const spellCheckResponse = await fetch(
                `http://localhost:8080/spellcheck/${processedQuery}`
            );
            if (!spellCheckResponse.ok) {
                throw new Error('Error checking spelling');
            }

            const spellCheckData = await spellCheckResponse.text();

            if (
                query.toLowerCase().trim() !==
                spellCheckData.toLowerCase().trim()
            ) {
                setSpellCheckedSuggestion(spellCheckData);
            } else {
                setSpellCheckedSuggestion('');
            }

            await searchJobPosting(spellCheckData);
        } catch (spellCheckError) {
            console.error('Error checking spelling:', spellCheckError);
        }
    };

    const searchJobPosting = async (spellCheckData) => {
        try {
            const spellCheckResponse = await fetch(
                `http://localhost:8080/search/jobposting/${spellCheckData}`
            );

            if (!spellCheckResponse.ok) {
                throw new Error('Error calling another API');
            }

            const data = await spellCheckResponse.json();

            if (data.length < 1) {
                setSearchedBefore(() => (searchedBefore ? true : false));
                message.error(
                    "Couldn't find any jobs with the provided search query!"
                );
            }

            setJobs(data);
            setLoadingJobs(false);
        } catch (error) {
            setLoadingJobs(false);
            setCloseSpellCheck(false);
            console.error('Error calling another API:', error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setHasQueryChanged(true);
        setSearchQuery(value);
    };

    const debouncedSearch = useDebounce(searchQuery, 500);

    const handleSelectSuggestion = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        setSearchedBefore(true);
        setCloseSpellCheck(false);
        spellCheck(suggestion);
    };

    const handleKeyDown = (event) => {
        if (suggestions.length > 0) {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) =>
                        prevIndex > 0 ? prevIndex - 1 : prevIndex
                    );
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setSelectedSuggestionIndex((prevIndex) =>
                        prevIndex < suggestions.length - 1
                            ? prevIndex + 1
                            : prevIndex
                    );
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (selectedSuggestionIndex !== -1) {
                        handleSelectSuggestion(
                            suggestions[selectedSuggestionIndex]
                        );
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
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    setShowSuggestions(false);
                    setSuggestions([]);
                    const regex = /[^a-zA-Z- ]/g;
                    if (regex.test(searchQuery) || searchQuery.trim() === '') {
                        message.error(
                            'Error: Input contains invalid characters. Only letters are allowed.'
                        );
                        setLoadingJobs(false);
                        setCloseSpellCheck(false);
                        setSearchedBefore(false);
                    } else {
                        setHasQueryChanged(false);
                        spellCheck(searchQuery);
                        setSearchedBefore(true);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setSuggestions([]);
            setShowSuggestions(false);

            try {
                if (debouncedSearch.trim() === '') {
                    throw new Error("String Can't be Empty!");
                }

                const response = await fetch(
                    `http://localhost:8080/autocomplete/${debouncedSearch.trim()}`
                );
                if (!response.ok) {
                    throw new Error('Error fetching suggestions');
                }
                const data = await response.json();
                setSuggestions(data);
                setShowSuggestions(searchQuery !== '' && data.length > 0);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        if (hasQueryChanged && debouncedSearch) fetchData();
    }, [debouncedSearch, searchQuery, hasQueryChanged]);

    useEffect(() => {
        setSelectedSuggestionIndex(-1);
        const suggestionsList = document.querySelector('.suggestions-list');

        if (suggestionsList) {
            if (showSuggestions) {
                suggestionsList.classList.add('expanded');
            } else {
                suggestionsList.classList.remove('expanded');
            }
        }
    }, [showSuggestions]);

    return (
        <div
            className='search-bar-container'
            style={{ width: `${props.width}` }}
        >
            <div className='search-input-wrapper'>
                <img
                    src={searchIcon}
                    alt=''
                    className='search-icon'
                    onClick={() => {
                        setShowSuggestions(false);
                        setSearchedBefore(() => {
                            const regex = /[^a-zA-Z- ]/g;
                            if (
                                regex.test(searchQuery) ||
                                searchQuery.trim() === ''
                            ) {
                                message.error(
                                    'Error: Input contains invalid characters. Only letters are allowed.'
                                );
                                setLoadingJobs(false);
                                setCloseSpellCheck(false);
                                return false;
                            } else {
                                spellCheck(searchQuery);
                                return true;
                            }
                        });
                    }}
                />
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder='Search...'
                    className={`suggestion ${
                        showSuggestions
                            ? 'suggestion-expanded'
                            : 'suggestion-hidden'
                    }`}
                />
            </div>
            {showSuggestions && (
                <ul className='suggestions-list'>
                    {loading ? (
                        <li>Loading...</li>
                    ) : error ? (
                        <li>{error}</li>
                    ) : (
                        suggestions
                            .filter((suggestion) =>
                                suggestion
                                    .toLowerCase()
                                    .includes(debouncedQuery.toLowerCase())
                            )
                            .map((suggestion, index) => (
                                <li
                                    key={index}
                                    className={
                                        index === selectedSuggestionIndex
                                            ? 'selected'
                                            : ''
                                    }
                                    onClick={() =>
                                        handleSelectSuggestion(suggestion)
                                    }
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
