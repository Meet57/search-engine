import React,{useState} from 'react';
import {Button,Drawer,List} from 'antd';
import {Layout,Input} from 'antd';
import SearchBoxComponent from "./SearchBoxComponent";
import '../styles/HomeScreen.css'
import splash4 from '../assets/images/logo.png';
import trending from '../assets/images/trending.svg';
import SearchBar from './SearchBar';
const {Content}=Layout;

const HomeScreen=(props) => {
    const {searchQuery,setSearchQuery}=props;

    const [searchTermsDrawerVisible,setSearchTermsDrawerVisible]=useState(false);
    const [trendingWordsDrawerVisible,setTrendingWordsDrawerVisible]=useState(false);

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

            <Content style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: "160px"}}>

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
                    alt="Google Logo"
                    style={{maxWidth: '700px'}}
                />
                <SearchBar
                    clicked={props.clicked}
                    setClicked={props.setClicked}
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
                {/* <SearchBoxComponent
                    width="60%"
                    setClicked={props.setClicked}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                /> */}
            </Content>
        </Layout>
    );
};

export default HomeScreen;
