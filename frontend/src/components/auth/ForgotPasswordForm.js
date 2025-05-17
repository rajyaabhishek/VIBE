import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, we would make an API call to request password reset
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <FaLinkedin className="h-12 w-12 text-linkedin-blue mx-auto" />
          </Link>
          <h1 className="text-3xl font-semibold mt-4 mb-2">Check your email</h1>
        </div>
        
        <div className="card p-6 text-center">
          <div className="mb-4 text-linkedin-blue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="mb-4">
            We've sent an email to <strong>{email}</strong> with a link to reset your password.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            If you don't see the email in your inbox, please check your spam folder.
          </p>
          <Link to="/login" className="btn-primary inline-block">
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <FaLinkedin className="h-12 w-12 text-linkedin-blue mx-auto" />
        </Link>
        <h1 className="text-3xl font-semibold mt-4 mb-2">Forgot password?</h1>
        <p className="text-gray-600">Reset password in two quick steps</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
            required
          />
        </div>

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
          {isLoading ? "Sending..." : "Reset password"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          <Link to="/login" className="text-linkedin-blue font-medium hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
