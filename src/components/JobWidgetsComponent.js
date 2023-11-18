import React, { useState } from 'react';
import JobCardComponent from './JobCardComponent';

const JobWidgetsComponent = () => {
  // State to store job data
  const [jobs, setJobs] = useState([
    { title: 'Software Engineer', description: 'Exciting software engineering position', link: 'software-engineer-link' },
    { title: 'Data Scientist', description: 'Join our data science team and make an impact', link: 'data-scientist-link' },
    { title: 'UX Designer', description: 'Create amazing user experiences with our design team', link: 'ux-designer-link' },
    { title: 'Product Manager', description: 'Lead the product development and strategy', link: 'product-manager-link' },
    { title: 'Marketing Specialist', description: 'Drive marketing initiatives for our brand', link: 'marketing-specialist-link' },
    // Add more job data as needed
  ]);

  return (
    <div>
      {/* Map through the jobs state and render JobCardComponent for each job */}
      {jobs.map((job, index) => (
        <JobCardComponent key={index} title={job.title} description={job.description} link={job.link} />
      ))}
    </div>
  );
};

export default JobWidgetsComponent;
