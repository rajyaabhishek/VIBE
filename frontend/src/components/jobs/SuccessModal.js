import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <FaCheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-sm text-gray-500 mb-6">
          Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been successfully submitted.
        </p>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <h4 className="font-medium text-gray-800 mb-2">What happens next?</h4>
          <ul className="text-left text-sm space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 mr-2">1.</span>
              <span>The hiring team will review your application</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 mr-2">2.</span>
              <span>If there's a match, they'll reach out to schedule interviews</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 mr-2">3.</span>
              <span>You can view your application status in the Jobs tab</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full btn-primary"
          >
            Continue Browsing Jobs
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="w-full btn-outline"
          >
            View Your Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
