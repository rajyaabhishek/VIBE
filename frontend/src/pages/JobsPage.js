import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobs, getJobById } from '../utils/mockData';
import JobCard from '../components/jobs/JobCard';
import JobDetail from '../components/jobs/JobDetail';
import JobSearch from '../components/jobs/JobSearch';
import JobApplyModal from '../components/jobs/JobApplyModal';
import SuccessModal from '../components/jobs/SuccessModal';

const JobsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [jobForSuccess, setJobForSuccess] = useState(null);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    remote: false,
    easyApply: false,
    datePosted: 'anytime',
    experience: [],
    salary: []
  });

  // Setup initial selected job if URL has an ID
  useEffect(() => {
    if (id) {
      const job = getJobById(parseInt(id));
      if (job) {
        setSelectedJob(job);
      }
    }
  }, [id]);

  const handleSearch = (params) => {
    setSearchParams(params);
    
    // Filter jobs based on search parameters
    let results = [...jobs];
    
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }
    
    if (params.location) {
      const location = params.location.toLowerCase();
      results = results.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }
    
    if (params.remote) {
      results = results.filter(job => job.remote);
    }
    
    if (params.easyApply) {
      results = results.filter(job => job.easyApply);
    }
    
    if (params.datePosted !== 'anytime') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (params.datePosted) {
        case 'day':
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }
      
      results = results.filter(job => 
        new Date(job.postedDate) >= cutoffDate
      );
    }
    
    if (params.experience.length > 0) {
      // In a real app, jobs would have an experience level field
      // This is a mock implementation
      // results = results.filter(job => params.experience.includes(job.experienceLevel));
    }
    
    if (params.salary.length > 0) {
      // In a real app, we would parse the salary ranges
      // This is a mock implementation
      // results = results.filter(job => params.salary.some(range => job.salaryRange === range));
    }
    
    setFilteredJobs(results);
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    navigate(`/jobs/${job.id}`);
  };

  const handleCloseJobDetail = () => {
    setSelectedJob(null);
    navigate('/jobs');
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplyModal(false);
    setJobForSuccess(selectedJob);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setJobForSuccess(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find your next job</h1>
      
      <JobSearch onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Jobs list */}
        <div className={`lg:col-span-${selectedJob ? '2' : '5'}`}>
          <h2 className="text-lg font-semibold mb-4">{filteredJobs.length} jobs found</h2>
          
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} onClick={() => handleJobSelect(job)}>
                <JobCard job={job} onApply={handleApplyClick} />
              </div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="card p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Job details */}
        {selectedJob && (
          <div className="hidden lg:block lg:col-span-3 h-screen sticky top-14 overflow-auto">
            <JobDetail 
              job={selectedJob} 
              onClose={handleCloseJobDetail} 
              onApply={handleApplyClick}
            />
          </div>
        )}
      </div>
      
      {/* Apply Modal */}
      {showApplyModal && selectedJob && (
        <JobApplyModal 
          job={selectedJob} 
          onClose={() => setShowApplyModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
      
      {/* Success Modal */}
      {showSuccessModal && jobForSuccess && (
        <SuccessModal 
          job={jobForSuccess} 
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default JobsPage;
