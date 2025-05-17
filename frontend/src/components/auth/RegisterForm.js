import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    headline: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(formData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <FaLinkedin className="h-12 w-12 text-linkedin-blue mx-auto" />
        </Link>
        <h1 className="text-3xl font-semibold mt-4 mb-2">
          {step === 1 && "Make the most of your professional life"}
          {step === 2 && "Professional details"}
          {step === 3 && "Profile information"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="input-field"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email or phone number"
                className="input-field"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (6+ characters)"
                className="input-field pr-10"
                minLength="6"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              By clicking Agree & Join, you agree to the LinkedIn{' '}
              <a href="#" className="text-linkedin-blue">User Agreement</a>,{' '}
              <a href="#" className="text-linkedin-blue">Privacy Policy</a>, and{' '}
              <a href="#" className="text-linkedin-blue">Cookie Policy</a>.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Headline (e.g. Software Engineer at Tech Corp)"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your headline helps you get discovered in LinkedIn
              </p>
            </div>

            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (e.g. San Francisco Bay Area)"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This helps us provide job recommendations near you
              </p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="card p-4">
              <h3 className="font-medium mb-2">Profile Summary</h3>
              <p className="text-sm mb-1"><span className="font-medium">Name:</span> {formData.name}</p>
              <p className="text-sm mb-1"><span className="font-medium">Email:</span> {formData.email}</p>
              <p className="text-sm mb-1"><span className="font-medium">Headline:</span> {formData.headline}</p>
              <p className="text-sm mb-1"><span className="font-medium">Location:</span> {formData.location}</p>
            </div>
            
            <p className="text-sm text-gray-600">
              You'll be able to edit your profile and add more information after registration.
            </p>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-linkedin-blue hover:bg-linkedin-darkBlue text-white py-3 rounded-full font-medium transition-colors duration-200 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? "Creating account..." : step < 3 ? "Continue" : "Agree & Join"}
        </button>
      </form>

      {step === 1 && (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already on LinkedIn?{" "}
            <Link to="/login" className="text-linkedin-blue font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      )}

      {step > 1 && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setStep(step - 1)}
            className="text-linkedin-blue font-medium hover:underline"
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
