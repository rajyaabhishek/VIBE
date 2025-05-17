
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { formatRelativeTime } from '../../utils/formatters';

const JobCard = ({ job, showFull = false, onApply }) => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  const handleShare = () => {
    console.log('Sharing job:', job.id);
    // Would normally open a share dialog
  };
  
  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    }
  };
  
  // Format the posted date
  const postedDate = formatRelativeTime(job.postedDate);
  
  return (
    <div className={`card ${showFull ? '' : 'hover:shadow-md transition-shadow'}`}>
      <div className="p-4">
        <div className="flex">
          <div className="mr-3 flex-shrink-0">
            <img 
              src={job.logo} 
              alt={job.company}
              className="w-12 h-12 object-cover rounded"
            />
          </div>
          
          <div className="flex-1">
            <Link 
              to={`/jobs/${job.id}`}
              className="font-medium text-black hover:text-linkedin-blue hover:underline"
            >
              {job.title}
            </Link>
            
            <p className="text-gray-700">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location} {job.remote && '(Remote)'}</p>
            
            {job.easyApply && (
              <span className="inline-block text-green-700 text-xs font-medium mt-1">
                Easy Apply
              </span>
            )}
            
            {showFull ? (
              <div className="mt-3">
                <p className="font-medium">Salary: {job.salary}</p>
                <p className="text-gray-600 mt-2">{job.description}</p>
                
                <h3 className="font-medium mt-4 mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-2 text-gray-500 text-sm flex items-center">
                <span>{postedDate}</span>
                <span className="mx-1">•</span>
                <span>{job.applicants} applicants</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={handleSave}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              {saved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <button 
              onClick={handleShare}
              className="text-gray-500 hover:text-gray-700 p-2 mt-1"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
        
        {showFull && (
          <div className="mt-5 flex space-x-3">
            <button 
              onClick={handleApply} 
              className={`flex-1 py-2 px-4 ${
                job.easyApply 
                  ? 'bg-linkedin-blue hover:bg-linkedin-darkBlue text-white' 
                  : 'border border-linkedin-blue text-linkedin-blue hover:bg-blue-50'
              } rounded-full font-medium`}
            >
              {job.easyApply ? 'Easy Apply' : 'Apply Now'}
            </button>
            <button 
              onClick={handleSave}
              className="py-2 px-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50"
            >
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
