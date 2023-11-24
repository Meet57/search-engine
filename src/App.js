import {useState} from "react";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import SearchResult from "./components/SearchResult";
import './styles/app.css';
const App=() => {
  const [clicked,setClicked]=useState(false);
  const [searchQuery,setSearchQuery]=useState('');

  return (
    <div>
      <SplashScreen />
      <div className="search-engine-component">

        {!clicked
          ?
          <HomeScreen
            setClicked={setClicked}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />:
          <SearchResult
            setClicked={setClicked}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />}
      </div>
    </div>
  );

};

export default App;
