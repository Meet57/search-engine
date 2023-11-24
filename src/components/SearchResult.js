import {Col,Divider,Row,Layout} from 'antd';
import SearchBoxComponent from './SearchBoxComponent';
import JobWidgetsComponent from './JobWidgetsComponent';
import {useState} from 'react';
import splash4 from '../assets/images/logo-t.png';
import SearchBar from './SearchBar';

const {Content}=Layout;

function SearchResult(props) {
    const {searchQuery,setSearchQuery}=props;
    return (
        <Layout>
            <Content style={{padding: '20px'}}>
                <Row justify="center">
                    <Col span={18}>
                        {/* <SearchBoxComponent width="100%"
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setClicked={props.setClicked}

                        /> */}
                        <img
                            src={splash4}
                            alt="Google Logo"
                            style={{maxWidth: '250px',margin: "0 auto"}}
                        />
                        <SearchBar
                            width="100%"
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setClicked={props.setClicked}
                        />
                        <Divider />
                        <JobWidgetsComponent />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default SearchResult;
