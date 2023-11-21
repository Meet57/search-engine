import React from 'react';
import {Layout,Input} from 'antd';
import SearchBoxComponent from "./SearchBoxComponent";
import splash4 from '../assets/images/splash4.jpeg';
const {Content}=Layout;

const HomeScreen=(props) => {
    const {searchQuery,setSearchQuery}=props;
    return (
        <Layout style={{minHeight: '100vh',backgroundColor: 'white'}}>
            <Content style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: "160px"}}>
                <img
                    src={splash4}
                    alt="Google Logo"
                    style={{maxWidth: '500px'}}
                />
                <SearchBoxComponent
                    width="60%"
                    setClicked={props.setClicked}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </Content>
        </Layout>
    );
};

export default HomeScreen;
