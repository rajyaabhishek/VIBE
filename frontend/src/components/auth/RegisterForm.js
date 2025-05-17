
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLinkedin } from 'react-icons/fa';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    headline: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [step, setStep] = useState(1);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setFormError('Please fill out all required fields');
      return false;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setFormError('');
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validate step 2 (optional fields, so just proceed)
    const success = register(formData);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-center mb-6">
        <FaLinkedin className="h-10 w-10 text-linkedin-blue" />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-6">
        {step === 1 ? "Join LinkedIn" : "Complete your profile"}
      </h1>
      
      {(formError || error) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {formError || error}
        </div>
      )}
      
      <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="6+ characters"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                By clicking Continue, you agree to LinkedIn's User Agreement, Privacy Policy, and Cookie Policy.
              </p>
            </div>
            
            <button type="button" onClick={handleNextStep} className="w-full btn-primary py-3 text-base">
              Continue
            </button>
          </>
        )}
        
        {step === 2 && (
          <>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: San Francisco Bay Area"
              />
            </div>
            
            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                Headline
              </label>
              <input
                id="headline"
                name="headline"
                type="text"
                value={formData.headline}
                onChange={handleChange}
                className="input-field"
                placeholder="Ex: Software Engineer at Tech Company"
              />
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="flex-1 py-3 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                Back
              </button>
              <button type="submit" className="flex-1 btn-primary py-3">
                Join now
              </button>
            </div>
          </>
        )}
      </form>
      
      <div className="mt-8 flex items-center justify-center">
        <span className="text-gray-600 mr-2">Already on LinkedIn?</span>
        <Link to="/login" className="text-linkedin-blue hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
