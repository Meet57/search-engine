import { Spin } from 'antd';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SearchResult from './screens/SearchResult';

import './styles/App.css';
import { useAppState } from './Context/GlobalContex';

const App = () => {
    const { searchedBefore, loadingJobs } = useAppState();

    return (
        <div
            className='main-div'
            style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}
        >
            <SplashScreen />
            <div className='search-engine-component'>
                {!searchedBefore ? <HomeScreen /> : <SearchResult />}
            </div>
            <Spin
                spinning={loadingJobs}
                fullscreen
            />
        </div>
    );
};

export default App;
