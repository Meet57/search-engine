import React from 'react';
import { Card, Button } from 'antd';
const JobCardComponent = (props) => {
    const { id, title, description, link, showLargeDrawer } = props;
    return (
        <Card
            className='my-3'
            title={title}
            bordered={false}
            style={{
                width: '100%'
            }}
            extra={
                <Button onClick={() => showLargeDrawer(props)}>
                    More Info
                </Button>
            }
        >
            <p className='description'>{description}</p>
        </Card>
    );
};

export default JobCardComponent;
