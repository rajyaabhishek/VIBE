
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobSearch from '../components/jobs/JobSearch';
import JobFilters from '../components/jobs/JobFilters';
import JobCard from '../components/jobs/JobCard';
import EasyApplyModal from '../components/jobs/EasyApplyModal';
import { jobs, getJobById } from '../utils/mockData';

const JobsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [selectedJob, setSelectedJob] = useState(id ? getJobById(parseInt(id)) : null);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  const handleSearch = (searchParams) => {
    // In a real app, we would search jobs from an API
    // For now, we'll just filter the mock data
    const filtered = jobs.filter(job => {
      const titleMatch = searchParams.title 
        ? job.title.toLowerCase().includes(searchParams.title.toLowerCase()) ||
          job.company.toLowerCase().includes(searchParams.title.toLowerCase())
        : true;
        
      const locationMatch = searchParams.location
        ? job.location.toLowerCase().includes(searchParams.location.toLowerCase())
        : true;
        
      return titleMatch && locationMatch;
    });
    
    setFilteredJobs(filtered);
  };
  
  const handleFilterChange = (filters) => {
    // In a real app, we would filter jobs from an API
    console.log('Filters applied:', filters);
  };
  
  const handleApply = (jobId) => {
    const job = getJobById(jobId);
    if (job && job.easyApply) {
      setShowApplyModal(true);
    } else {
      // Redirect to external application
      window.open('https://example.com/apply', '_blank');
    }
  };
  
  // If a specific job is selected (from URL params), show job details
  if (selectedJob) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <button 
              onClick={() => {
                setSelectedJob(null);
                navigate('/jobs');
              }}
              className="mb-4 flex items-center text-linkedin-blue hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to job search
            </button>
            
            <JobCard 
              job={selectedJob} 
              showFull={true} 
              onApply={handleApply}
            />
            
            {showApplyModal && (
              <EasyApplyModal 
                job={selectedJob}
                onClose={() => setShowApplyModal(false)}
              />
            )}
          </div>
          
          <div className="hidden lg:block">
            <div className="card p-4 mb-4">
              <h2 className="text-xl font-bold mb-3">Similar Jobs</h2>
              
              <div className="space-y-4">
                {jobs
                  .filter(job => job.id !== selectedJob.id && job.title.includes(selectedJob.title.split(' ')[0]))
                  .slice(0, 3)
                  .map(job => (
                    <div key={job.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                      <h3 className="font-medium hover:text-linkedin-blue cursor-pointer">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <p className="text-gray-500 text-xs">{job.location}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="card p-4">
              <h2 className="text-lg font-bold mb-3">Job Seeker Guidance</h2>
              <p className="text-gray-600 text-sm mb-3">
                Recommended based on your activity
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <h3 className="font-medium text-sm">I want to improve my resume</h3>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h3 className="font-medium text-sm">I want to improve my LinkedIn profile</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show job search/listing page
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar with filters */}
        <div className="hidden lg:block">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>
        
        {/* Main job list */}
        <div className="lg:col-span-3">
          <JobSearch onSearch={handleSearch} />
          
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {filteredJobs.length} jobs found
            </h1>
            
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Sort by:</span>
              <select className="border-0 focus:ring-0 text-linkedin-blue font-medium">
                <option>Most relevant</option>
                <option>Most recent</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div 
                key={job.id} 
                onClick={() => {
                  setSelectedJob(job);
                  navigate(`/jobs/${job.id}`);
                }}
                className="cursor-pointer"
              >
                <JobCard job={job} />
              </div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No matching jobs found</h3>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
