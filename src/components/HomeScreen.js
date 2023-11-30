import React,{useState} from 'react';
import {Button,Drawer,List} from 'antd';
import {Layout} from 'antd';
import '../styles/HomeScreen.css'
import splash4 from '../assets/images/logo.png';
import trending from '../assets/images/trending.svg';
import SearchBar from './SearchBar';
import {useEffect} from 'react';
import {useAppState} from '../Context/GlobalContex';
const {Content}=Layout;

const HomeScreen=(props) => {

    const {searchQuery,setSearchQuery,searchedBefore,setSearchedBefore}=useAppState();

    const [searchTermsDrawerVisible,setSearchTermsDrawerVisible]=useState(false);
    const [trendingWordsDrawerVisible,setTrendingWordsDrawerVisible]=useState(false);

    // Set Searchedbefore to false while loading the homescreen
    useEffect(() => {
        setSearchQuery('');
        setSearchedBefore(false);
    },[])

    // Mock data for trending terms and words
    const trendingSearchTerms=['Software Engineer','Software Engineer Intern','Software Engineer Coop','Toronto'];
    const trendingWordsWithFrequency=[
        {word: 'Software',frequency: 50},
        {word: 'Emgineer',frequency: 30},
        {word: 'Intern',frequency: 20},
        {word: 'Coop',frequency: 15},
    ];

    const showSearchTermsDrawer=() => {
        setSearchTermsDrawerVisible(true);
    };

    const showTrendingWordsDrawer=() => {
        setTrendingWordsDrawerVisible(true);
    };

    const onClose=() => {
        setSearchTermsDrawerVisible(false);
        setTrendingWordsDrawerVisible(false);
    };

    return (
        <Layout style={{minHeight: '100vh',backgroundColor: 'white'}} >
            <Content className="home-screen-div">
                <Drawer
                    title="Trending Search Terms"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    closeIcon={false}
                    visible={searchTermsDrawerVisible}
                >
                    <List
                        dataSource={trendingSearchTerms}
                        renderItem={(item,index) => <List.Item>
                            <div className='trending-item'>
                                <img src={trending} />
                                <span>{item}</span>
                            </div>
                        </List.Item>}
                    />
                </Drawer>
                <Drawer
                    title="Trending Words with Frequency"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    closeIcon={false}
                    visible={trendingWordsDrawerVisible}
                >
                    <List
                        dataSource={trendingWordsWithFrequency}
                        renderItem={(item,index) => <List.Item>
                            <div className='trending-item'>
                                <img src={trending} />
                                <span>{item.word} - {item.frequency}</span>
                            </div>
                        </List.Item>}
                    />
                </Drawer>
                <img
                    src={splash4}
                    className='home-logo'
                    alt="Google Logo"
                    style={{maxWidth: '700px',width: '100%',height: 'auto'}}
                />

                <SearchBar
                    width={"65%"}
                    searchedBefore={searchedBefore}
                    setSearchedBefore={setSearchedBefore}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <div className="trending-button">
                    <Button onClick={showSearchTermsDrawer}>
                        Trending Terms
                    </Button>
                    <Button onClick={showTrendingWordsDrawer}>
                        Trending Words
                    </Button>
                </div>
            </Content>
        </Layout>
    );
};

export default HomeScreen;
