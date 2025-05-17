
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // If auth is still loading, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linkedin-light">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-blue"></div>
      </div>
    );
  }
  
  // If not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
