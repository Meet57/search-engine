import React,{useState} from 'react';
import {Button,Drawer,Space,Pagination} from 'antd';
import JobCardComponent from './JobCardComponent';

const JobWidgetsComponent=() => {
  const [open,setOpen]=useState(false);
  const [size,setSize]=useState();
  const [currentPage,setCurrentPage]=useState(1);
  const pageSize=8; // Number of jobs to display per page

  const showDefaultDrawer=() => {
    setSize('default');
    setOpen(true);
  };

  const showLargeDrawer=() => {
    setSize('large');
    setOpen(true);
  };

  const onClose=() => {
    setOpen(false);
  };

  const [jobs,setJobs]=useState([
    {title: 'Software Engineer',description: 'Exciting software engineering position',link: 'software-engineer-link'},
    {title: 'Data Scientist',description: 'Join our data science team and make an impact',link: 'data-scientist-link'},
    {title: 'UX Designer',description: 'Create amazing user experiences with our design team',link: 'ux-designer-link'},
    {title: 'Product Manager',description: 'Lead the product development and strategy',link: 'product-manager-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},
    {title: 'Marketing Specialist',description: 'Drive marketing initiatives for our brand',link: 'marketing-specialist-link'},

    // Add more job data as needed
  ]);

  // Calculate the range of jobs to display based on the current page and page size
  const startIndex=(currentPage-1)*pageSize;
  const endIndex=startIndex+pageSize;
  const displayedJobs=jobs.slice(startIndex,endIndex);

  const onPageChange=(page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Map through the displayed jobs and render JobCardComponent for each job */}
      {displayedJobs.map((job,index) => (
        <JobCardComponent key={index} title={job.title} description={job.description} link={job.link} showLargeDrawer={showLargeDrawer} />
      ))}

      {/* Pagination component */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={jobs.length}
        onChange={onPageChange}
        style={{marginTop: '20px',textAlign: 'center'}}
      />

      <Drawer
        title={`${size} Drawer`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      ></Drawer>
    </div>
  );
};

export default JobWidgetsComponent;
