import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLinkedin, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location or default to home page
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        // Navigate to the page they were trying to access
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
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
        <h1 className="text-3xl font-semibold mt-4 mb-2">Sign in</h1>
        <p className="text-gray-600">Stay updated on your professional world</p>
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
            placeholder="Email or Phone"
            className="input-field"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field pr-10"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>

          <Link to="/forgot-password" className="text-sm text-linkedin-blue hover:underline">
            Forgot password?
          </Link>
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
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <span className="text-gray-500 text-sm">or</span>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>

      <div className="mt-6 space-y-3">
        <button className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-full font-medium flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5 mr-2" />
          Continue with Google
        </button>
        <button className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-full font-medium flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
          <img src="https://www.svgrepo.com/show/183608/apple.svg" alt="Apple" className="h-5 w-5 mr-2" />
          Sign in with Apple
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          New to LinkedIn?{" "}
          <Link to="/register" className="text-linkedin-blue font-medium hover:underline">
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
