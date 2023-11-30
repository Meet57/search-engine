import React from 'react';
import {Card,Row,Col,Avatar,Typography} from 'antd';
import {PageHeader} from '@ant-design/pro-layout';
import {TeamOutlined,UserOutlined} from '@ant-design/icons';

const {Title,Paragraph}=Typography;

const AboutUsPage=() => {
    const teamMembers=[
        {name: 'John Doe',role: 'Team Lead',avatar: 'JD'},
        {name: 'Jane Smith',role: 'Frontend Developer',avatar: 'JS'},
        {name: 'Robert Johnson',role: 'Backend Developer',avatar: 'RJ'},
        {name: 'Emily Davis',role: 'UI/UX Designer',avatar: 'ED'},
        {name: 'Michael Brown',role: 'QA Tester',avatar: 'MB'},
    ];

    return (
        <div style={{textAlign: 'center',padding: '20px',backgroundColor: '#f0f2f5',minHeight: '100vh'}}>
            <PageHeader
                className="site-page-header"
                title="About Us"
                subTitle="Meet the Team Behind Our Search Engine Project"
                style={{backgroundColor: '#fff',padding: '20px',borderRadius: '8px',marginBottom: '20px'}}
            />

            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel urna sed ligula
                ultrices euismod sit amet sed libero. Fusce eu dui nec velit venenatis consectetur.
                Phasellus in nunc ut orci cursus consectetur.
            </Paragraph>

            <Row gutter={[16,16]} justify="center" style={{marginTop: '20px'}}>
                {teamMembers.map((member,index) => (
                    <Col key={index} xs={24} sm={12} lg={12} style={{marginBottom: '20px'}}>
                        <Card
                            style={{borderRadius: '8px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
                            cover={<img alt={`${member.name}'s Avatar`} src={`/avatars/${member.avatar}.jpg`} />}
                        >
                            <Card.Meta
                                title={<Title level={4}>{member.name}</Title>}
                                description={member.role}
                                avatar={<Avatar size={40} icon={<UserOutlined />} />}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{marginTop: '40px',textAlign: 'center',backgroundColor: '#fff',padding: '20px',borderRadius: '8px'}}>
                <PageHeader
                    className="site-page-header"
                    title="Our Mission"
                    subTitle="Building an Innovative Search Engine for Academic Excellence"
                />
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel urna sed ligula
                    ultrices euismod sit amet sed libero. Fusce eu dui nec velit venenatis consectetur.
                    Phasellus in nunc ut orci cursus consectetur.
                </Paragraph>
            </div>

            <div style={{marginTop: '40px',textAlign: 'center',backgroundColor: '#fff',padding: '20px',borderRadius: '8px'}}>
                <PageHeader
                    className="site-page-header"
                    title="Contact Us"
                    subTitle="Have questions or suggestions? Reach out to us!"
                />
                <Paragraph>
                    Email: <a href="mailto:info@example.com">info@example.com</a>
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUsPage;
