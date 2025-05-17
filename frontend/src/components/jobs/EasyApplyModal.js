
import { useState } from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const EasyApplyModal = ({ job, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    experienceYears: '',
    skills: '',
    availability: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would submit the form data to an API
    console.log('Submitting application:', formData);
    setStep(4); // Success step
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            {step > 1 && step < 4 && (
              <button 
                onClick={handleBack}
                className="mr-3 text-gray-500 hover:text-gray-700"
              >
                <FaArrowLeft />
              </button>
            )}
            <h2 className="text-xl font-semibold">
              {step === 4 ? 'Application Submitted' : 'Easy Apply'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {/* Job summary (shown on all steps) */}
        {step < 4 && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium">{job.title}</h3>
            <p className="text-gray-600">{job.company} • {job.location}</p>
          </div>
        )}
        
        {/* Step content */}
        <div className="p-4">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Resume <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-linkedin-blue hover:file:bg-blue-100"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Accepted formats: PDF, DOC, DOCX
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  type="submit"
                  className="bg-linkedin-blue hover:bg-linkedin-darkBlue text-white font-medium py-2 px-6 rounded-full"
                >
                  Next
                </button>
              </div>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <h3 className="text-lg font-medium mb-4">Additional Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows="5"
                    className="input-field"
                    placeholder="Why are you a good fit for this role?"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experienceYears"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Relevant Skills <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows="3"
                    className="input-field"
                    placeholder="List your skills relevant to this position"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  type="submit"
                  className="bg-linkedin-blue hover:bg-linkedin-darkBlue text-white font-medium py-2 px-6 rounded-full"
                >
                  Next
                </button>
              </div>
            </form>
          )}
          
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-medium mb-4">Final Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                    When can you start? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="immediately">Immediately</option>
                    <option value="1-week">1 week</option>
                    <option value="2-weeks">2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="2-months">2+ months</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Application Summary</h4>
                  <p className="text-gray-600">Please review your application before submitting.</p>
                  
                  <div className="mt-3 space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.name}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <p><span className="font-medium">Resume:</span> {formData.resume ? formData.resume.name : 'None'}</p>
                    <p><span className="font-medium">Experience:</span> {formData.experienceYears}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  type="submit"
                  className="bg-linkedin-blue hover:bg-linkedin-darkBlue text-white font-medium py-2 px-6 rounded-full"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
          
          {step === 4 && (
            <div className="py-8 text-center">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
                <FaCheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h3 className="text-xl font-medium mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Your application for {job.title} at {job.company} has been successfully submitted.
              </p>
              
              <button 
                onClick={onClose}
                className="bg-linkedin-blue hover:bg-linkedin-darkBlue text-white font-medium py-2 px-6 rounded-full"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EasyApplyModal;
