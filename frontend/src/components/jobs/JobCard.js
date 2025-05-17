import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  FaBookmark, 
  FaRegBookmark, 
  FaShare, 
  FaEllipsisH,
  FaCheck,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

const JobCard = ({ job, onApply }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };
  
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  
  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onApply(job);
  };
  
  const postedDate = new Date(job.postedDate);
  const postedTimeAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="card hover:shadow-md transition-shadow duration-200">
        <div className="p-4 md:p-6">
          <div className="flex items-start">
            {/* Logo */}
            <div className="flex-shrink-0 w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden mr-4">
              {job.logo ? (
                <img 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-xl font-bold text-gray-400">
                  {job.company.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Job details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-linkedin-blue">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600">{job.company}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <FaMapMarkerAlt className="mr-1" />
                <span>{job.location}</span>
                {job.remote && (
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Remote
                  </span>
                )}
              </div>
              
              {job.salary && (
                <p className="text-sm text-gray-600 mt-1">
                  {job.salary}
                </p>
              )}
              
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <FaClock className="mr-1" />
                <span>{postedTimeAgo}</span>
                
                {job.applicants && (
                  <span className="ml-3">{job.applicants} applicants</span>
                )}
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
            
            {/* Action buttons */}
            <div className="ml-4 flex-shrink-0 flex flex-col items-center space-y-2">
              <button
                onClick={toggleSaved}
                className="text-gray-400 hover:text-linkedin-blue focus:outline-none"
                aria-label={isSaved ? "Unsave job" : "Save job"}
              >
                {isSaved ? (
                  <FaBookmark className="h-5 w-5" />
                ) : (
                  <FaRegBookmark className="h-5 w-5" />
                )}
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="text-gray-400 hover:text-linkedin-blue focus:outline-none"
                aria-label="Share job"
              >
                <FaShare className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-linkedin-blue focus:outline-none"
                  aria-label="More options"
                >
                  <FaEllipsisH className="h-5 w-5" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 top-8 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowMenu(false);
                        }}
                      >
                        Not interested
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowMenu(false);
                        }}
                      >
                        Report job
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Apply button - only show on hover */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleApply}
              className="btn-primary text-sm py-1.5"
            >
              {job.easyApply ? "Easy Apply" : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
