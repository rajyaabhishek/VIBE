
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLinkedin } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!email.trim() || !password.trim()) {
      setFormError('Please enter both email and password');
      return;
    }

    // Attempt to login
    const success = login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-center mb-6">
        <FaLinkedin className="h-10 w-10 text-linkedin-blue" />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-6">Sign in</h1>
      <p className="text-center text-gray-600 mb-8">
        Stay updated on your professional world
      </p>
      
      {(formError || error) && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {formError || error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="Email or Phone"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <Link to="/forgot-password" className="text-linkedin-blue hover:underline text-sm font-medium">
            Forgot password?
          </Link>
        </div>
        
        <button type="submit" className="w-full btn-primary py-3 text-base">
          Sign in
        </button>
      </form>
      
      <div className="mt-8 flex items-center justify-center">
        <span className="text-gray-600 mr-2">New to LinkedIn?</span>
        <Link to="/register" className="text-linkedin-blue hover:underline font-medium">
          Join now
        </Link>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>For demo purposes, use these credentials:</p>
        <p className="mt-1">Email: john.doe@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};

export default LoginForm;
