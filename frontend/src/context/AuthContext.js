
import { createContext, useContext, useEffect, useState } from 'react';
import { users } from '../utils/mockData';

// Create the authentication context
const AuthContext = createContext();

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('linkedinUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('linkedinUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    setError(null);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Clone the user without the password
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('linkedinUser', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  // Register function (for mock purposes)
  const register = (userData) => {
    setError(null);
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      setError('Email already in use');
      return false;
    }
    
    // In a real app, we'd send this to the server
    // For mock purposes, we'll just log it and "log in" the user
    console.log('Registering new user:', userData);
    
    // Create a mock user
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      headline: userData.headline || '',
      location: userData.location || '',
      profilePicture: '',
      connections: [],
      skills: [],
      experience: [],
      education: []
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('linkedinUser', JSON.stringify(newUser));
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('linkedinUser');
  };

  // Update user profile (mock implementation)
  const updateProfile = (updates) => {
    setError(null);
    
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('linkedinUser', JSON.stringify(updatedUser));
      return true;
    } else {
      setError('No user logged in');
      return false;
    }
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
