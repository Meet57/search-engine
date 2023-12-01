import { Col, Divider, Row, Layout, Alert, Button, Empty, message } from 'antd';
import JobWidgetsComponent from '../components/JobWidgetsComponent';
import SearchBar from '../components/SearchBar';
import splash4 from '../assets/images/logo-t.png';
import { useEffect } from 'react';
import { useAppState } from '../Context/GlobalContex';
import '../styles/SearchResult.css';
const { Content } = Layout;

const SearchResult = (props) => {
    const {
        searchQuery,
        setSearchQuery,
        searchedBefore,
        setSearchedBefore,
        setShowSuggestions,
        jobs,
        setJobs,
        spellCheckedSuggestion,
        setSuggestions,
        closeSpellCheck,
        setLoadingJobs,
        setCloseSpellCheck
    } = useAppState();
    useEffect(() => {
        setShowSuggestions(false);
        setSuggestions([]);
    }, []);

    const searchJobPosting = async (spellCheckData) => {
        try {
            // Use spellCheckData to determine the parameters for the other API call
            const spellCheckResponse = await fetch(
                `http://localhost:8080/search/jobposting/${spellCheckData}`
            );

            if (!spellCheckResponse.ok) {
                throw new Error('Error calling another API');
            }

            const data = await spellCheckResponse.json();

            if (data.length < 1) {
                setSearchedBefore(() => {
                    if (searchedBefore) {
                        return true;
                    } else {
                        return false;
                    }
                });
                setCloseSpellCheck(false);
                message.error(
                    "Couldn't find any jobs with provided search query!"
                );
            }
            setJobs(data);
            setLoadingJobs(false);
            setCloseSpellCheck(false);
        } catch (error) {
            setLoadingJobs(false);
            setCloseSpellCheck(false);
            console.error('Error calling another API:', error);
        }
    };

    return (
        <Layout className='job-card-div'>
            <Content style={{ padding: '25px 0px 50px 0px' }}>
                <Row justify='center'>
                    <Col
                        xs={22}
                        sm={18}
                    >
                        <img
                            src={splash4}
                            alt='Google Logo'
                            style={{
                                maxWidth: '250px',
                                margin: '0 auto',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSearchedBefore(false)}
                        />
                        <SearchBar
                            width='100%'
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            searchedBefore={searchedBefore}
                            setSearchedBefore={setSearchedBefore}
                        />
                        <Divider />
                        {closeSpellCheck && spellCheckedSuggestion && (
                            <div className='spell-check-div'>
                                <h3>
                                    Did you mean "
                                    <span
                                        onClick={() => {
                                            setSearchQuery(
                                                spellCheckedSuggestion
                                            );
                                            searchJobPosting(
                                                spellCheckedSuggestion
                                            );
                                        }}
                                        className='spellCheckSuggestion'
                                    >
                                        {spellCheckedSuggestion}
                                    </span>
                                    " ? Search instead for{' '}
                                    <span
                                        className='spellCheckSuggestion'
                                        onClick={() => {
                                            setSearchQuery(searchQuery);
                                            searchJobPosting(searchQuery);
                                        }}
                                    >
                                        {searchQuery}
                                    </span>
                                    ".
                                </h3>
                            </div>
                        )}
                        {jobs.length < 1 ? (
                            <Empty
                                style={{ marginTop: '100px' }}
                                description={<span>No Jobs Found!</span>}
                            />
                        ) : (
                            <JobWidgetsComponent />
                        )}
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default SearchResult;
