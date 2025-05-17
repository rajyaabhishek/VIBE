import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUpload, FaFile, FaTimesCircle, FaCheck } from 'react-icons/fa';

const JobApplyModal = ({ job, onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    resume: null,
    phoneNumber: currentUser?.phone || '',
    coverLetter: '',
    workExperience: currentUser?.experience || [],
    education: currentUser?.education || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  const removeResume = () => {
    setFormData({ ...formData, resume: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {step === 1 && `Apply to ${job.company}`}
              {step === 2 && 'Additional Information'}
              {step === 3 && 'Review Application'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 flex items-center space-x-2">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-linkedin-blue' : 'bg-gray-200'}`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-linkedin-blue' : 'bg-gray-200'}`}></div>
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-linkedin-blue' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {job.title} at {job.company}
                  </h3>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-3">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={currentUser?.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"}
                        alt={currentUser?.name}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{currentUser?.name}</h4>
                      <p className="text-sm text-gray-500">{currentUser?.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </label>
                  {!formData.resume ? (
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-linkedin-blue hover:text-linkedin-darkBlue focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 flex items-center space-x-2 p-4 border border-gray-300 rounded-md">
                      <FaFile className="h-6 w-6 text-gray-500" />
                      <span className="text-sm font-medium">{formData.resume.name}</span>
                      <button
                        type="button"
                        onClick={removeResume}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <FaTimesCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={5}
                    className="input-field"
                    placeholder="Explain why you're a good fit for this position..."
                  ></textarea>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Work Experience</h3>
                  {currentUser?.experience?.map((exp, index) => (
                    <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md">
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                        {exp.endDate 
                          ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                          : ' Present'}
                      </p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>
                  {currentUser?.education?.map((edu, index) => (
                    <div key={index} className="mb-4 p-3 border border-gray-200 rounded-md">
                      <h4 className="font-medium">{edu.school}</h4>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                        {new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Application Summary</h3>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Position</h4>
                      <p>{job.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Company</h4>
                      <p>{job.company}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Location</h4>
                      <p>{job.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Resume</h4>
                      {formData.resume ? (
                        <div className="flex items-center text-linkedin-blue">
                          <FaFile className="mr-2" />
                          <span>{formData.resume.name}</span>
                        </div>
                      ) : (
                        <span className="text-red-500">No resume uploaded</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Phone Number</h4>
                      <p>{formData.phoneNumber}</p>
                    </div>
                    {formData.coverLetter && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Cover Letter</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{formData.coverLetter}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2">By submitting your application, you agree:</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    <li>To allow LinkedIn to share your profile and application with {job.company}</li>
                    <li>To be contacted about current and future opportunities</li>
                    <li>To the processing of your data as described in our Privacy Policy</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center sticky bottom-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-outline"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
              >
                Cancel
              </button>
            )}
            
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : step < 3 ? (
                'Continue'
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplyModal;
