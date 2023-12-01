import React, { useState } from 'react';
import { Button, Drawer, Space, Pagination, Card, Divider } from 'antd';
import JobCardComponent from './JobCardComponent';
import { useAppState } from '../Context/GlobalContex';

const JobWidgetsComponent = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [pageSize, setPageSize] = useState(8);

    const [currentPage, setCurrentPage] = useState(1);
    const [drawerData, setDrawerData] = useState([]);

    const { jobs } = useAppState();

    const showDefaultDrawer = () => {
        setSize('default');
        setOpen(true);
    };

    const showLargeDrawer = (props) => {
        setDrawerData(props);
        setSize('large');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // Calculate the range of jobs to display based on the current page and page size
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedJobs = jobs.slice(startIndex, endIndex);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const onSizeChange = (current, size) => {
        setCurrentPage(1); // Reset to the first page when changing pageSize
        setPageSize(size);
    };

    const handleApplyButtonClick = () => {
        const link = drawerData.link;
        window.open(link, '_blank');
        onClose();
    };

    return (
        <div>
            {/* Map through the displayed jobs and render JobCardComponent for each job */}
            {displayedJobs.map((job, index) => (
                <JobCardComponent
                    key={index}
                    id={job.jobId}
                    title={job.jobTitle}
                    company={job.company}
                    location={job.location}
                    description={job.description}
                    link={job.url}
                    showLargeDrawer={showLargeDrawer}
                />
            ))}

            {/* Pagination component */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={jobs.length}
                onChange={onPageChange}
                onShowSizeChange={onSizeChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />

            {/* TODO change the title of the drawer */}
            <Drawer
                title={drawerData.jobTitle}
                placement='right'
                size={size}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                        <Button
                            className='btn'
                            onClick={handleApplyButtonClick}
                        >
                            Apply
                        </Button>
                    </Space>
                }
            >
                <Card>
                    <h1>{drawerData.title}</h1>
                    <Divider />
                    <h1>{drawerData.company}</h1>
                    <p>{drawerData.location}</p>
                    <br />
                    <p>{drawerData.description}</p>
                </Card>
            </Drawer>
        </div>
    );
};

export default JobWidgetsComponent;
