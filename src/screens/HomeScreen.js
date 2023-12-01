import React, { useState, useEffect } from 'react';
import { Button, Drawer, List, message } from 'antd';
import { Layout } from 'antd';
import '../styles/HomeScreen.css';
import splash4 from '../assets/images/logo.png';
import trending from '../assets/images/trending.svg';
import SearchBar from '../components/SearchBar';
import { useAppState } from '../Context/GlobalContex';
const { Content } = Layout;

const HomeScreen = (props) => {
    const { searchQuery, setSearchQuery, searchedBefore, setSearchedBefore } =
        useAppState();

    const [searchTermsDrawerVisible, setSearchTermsDrawerVisible] =
        useState(false);
    const [trendingWordsDrawerVisible, setTrendingWordsDrawerVisible] =
        useState(false);
    const [trendingSearchTerms, seTrendingSearchTerms] = useState([]);
    const [trendingWordsWithFrequency, setTrendingWordsWithFrequency] =
        useState([]);

    // Set Searchedbefore to false while loading the homescreen
    useEffect(() => {
        setSearchQuery('');
        setSearchedBefore(false);
    }, []);

    const showSearchTermsDrawer = () => {
        setSearchTermsDrawerVisible(true);
    };

    const showTrendingWordsDrawer = () => {
        setTrendingWordsDrawerVisible(true);
    };

    const onClose = () => {
        setSearchTermsDrawerVisible(false);
        setTrendingWordsDrawerVisible(false);
    };

    const updateTrendingData = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/searchfrequency/trending'
            );

            if (!response.ok) {
                message.error("Error: Can't update the trending data.");
                throw new Error("Error: Can't update the trending data.");
            }

            const data = await response.json();
            console.log(data);
            setTrendingWordsWithFrequency(data.wordFrequencyMap);
            seTrendingSearchTerms(data.termFrequencyMap);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        updateTrendingData();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <Content className='home-screen-div'>
                <Drawer
                    title='Trending Search Terms'
                    placement='right'
                    closable={true}
                    onClose={onClose}
                    closeIcon={false}
                    visible={searchTermsDrawerVisible}
                >
                    <List
                        dataSource={trendingSearchTerms}
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className='trending-item'>
                                    <img src={trending} />
                                    <span>
                                        {item.replace(/\b\w/g, (match) =>
                                            match.toUpperCase()
                                        )}
                                    </span>
                                </div>
                            </List.Item>
                        )}
                    />
                </Drawer>
                <Drawer
                    title='Trending Words with Frequency'
                    placement='right'
                    closable={true}
                    onClose={onClose}
                    closeIcon={false}
                    visible={trendingWordsDrawerVisible}
                >
                    <List
                        dataSource={Object.entries(trendingWordsWithFrequency)}
                        renderItem={(item, index) => (
                            <List.Item>
                                <div className='trending-item'>
                                    <img src={trending} />
                                    <span>
                                        {item[0].replace(/\b\w/g, (match) =>
                                            match.toUpperCase()
                                        )}{' '}
                                        - {item[1]}
                                    </span>
                                </div>
                            </List.Item>
                        )}
                    />
                </Drawer>

                <img
                    src={splash4}
                    className='home-logo'
                    alt='Google Logo'
                    style={{ maxWidth: '700px', width: '100%', height: 'auto' }}
                />

                <SearchBar
                    width={'65%'}
                    searchedBefore={searchedBefore}
                    setSearchedBefore={setSearchedBefore}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <div className='trending-button'>
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
