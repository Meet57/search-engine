import React,{createContext,useContext,useState} from 'react';

const AppStateContext=createContext();

export const AppStateProvider=({children}) => {
    const [searchedBefore,setSearchedBefore]=useState(false);
    const [searchQuery,setSearchQuery]=useState('');
    const [showSuggestions,setShowSuggestions]=useState(false);
    const [suggestions,setSuggestions]=useState([]);
    const [jobs,setJobs]=useState([]);
    const [loadingJobs,setLoadingJobs]=useState(false);
    const [spellCheckedSuggestion,setSpellCheckedSuggestion]=useState('');

    const [closeSpellCheck,setCloseSpellCheck]=useState(true);

    return (
        <AppStateContext.Provider value={{
            searchedBefore,
            setSearchedBefore,
            searchQuery,
            setSearchQuery,
            showSuggestions,
            setShowSuggestions,
            suggestions,
            setSuggestions,
            jobs,
            setJobs,
            spellCheckedSuggestion,
            setSpellCheckedSuggestion,
            closeSpellCheck,
            setCloseSpellCheck,
            loadingJobs,
            setLoadingJobs
        }}>
            {children}
        </AppStateContext.Provider>
    );
};

// Custom a hook to access the state in your components
export const useAppState=() => {
    const context=useContext(AppStateContext);
    if(!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
