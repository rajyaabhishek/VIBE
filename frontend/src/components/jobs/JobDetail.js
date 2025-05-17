import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaBriefcase, FaUsers, FaClock, FaCheck } from 'react-icons/fa';
import { getCompanyById } from '../../utils/mockData';

const JobDetail = ({ job, onApply, onClose }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  
  const company = job ? getCompanyById(job.id) : null;
  const postedDate = job ? new Date(job.postedDate) : null;
  const formattedDate = postedDate ? format(postedDate, 'MMMM d, yyyy') : '';
  
  if (!job) return null;

  return (
    <div className="bg-white rounded-lg h-full overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Job Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close details"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Job header */}
        <div className="flex items-start">
          <div className="flex-shrink-0 w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden mr-4">
            {job.logo ? (
              <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-bold text-gray-400">
                {job.company.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="mt-1">
              <button 
                onClick={() => navigate(`/company/${company?.id || 1}`)}
                className="text-linkedin-blue hover:underline font-medium"
              >
                {job.company}
              </button>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2 gap-y-2">
              <div className="flex items-center mr-4">
                <FaMapMarkerAlt className="mr-1 text-gray-400" />
                <span>{job.location}</span>
              </div>
              
              {job.remote && (
                <div className="flex items-center mr-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Remote
                  </span>
                </div>
              )}
              
              <div className="flex items-center mr-4">
                <FaClock className="mr-1 text-gray-400" />
                <span>Posted {formattedDate}</span>
              </div>
              
              <div className="flex items-center mr-4">
                <FaUsers className="mr-1 text-gray-400" />
                <span>{job.applicants} applicants</span>
              </div>
            </div>
            
            {job.easyApply && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FaCheck className="mr-1" />
                  Easy Apply
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="ml-4 text-gray-400 hover:text-linkedin-blue focus:outline-none"
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            {isSaved ? (
              <FaBookmark className="h-6 w-6" />
            ) : (
              <FaRegBookmark className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Apply buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => onApply(job)}
            className="btn-primary flex-1"
          >
            {job.easyApply ? "Easy Apply" : "Apply"}
          </button>
          
          <button
            className="btn-outline flex-1"
          >
            Save
          </button>
        </div>
        
        {/* Job details */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Job description</h2>
          <p className="text-gray-700 mb-4">
            {job.description}
          </p>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">Qualifications</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          
          {company && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-3">About {company.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden mr-4">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xl font-bold text-gray-400">
                      {company.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                {company.about}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-linkedin-blue hover:underline"
                  >
                    {company.website.replace('https://', '')}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Headquarters:</span> {company.headquarters}
                </div>
                <div>
                  <span className="font-medium">Founded:</span> {company.founded}
                </div>
                <div>
                  <span className="font-medium">Company size:</span> {company.employees}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
