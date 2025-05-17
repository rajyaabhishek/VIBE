import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  
  // If no user is logged in, show a simple welcome page
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to LinkedIn Clone</h1>
          <p className="mt-4 text-xl text-gray-600">Please log in to access all features</p>
          <div className="mt-8">
            <Link 
              to="/login" 
              className="btn-primary px-8 py-3 text-base font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-600">You're now logged in to the LinkedIn Clone.</p>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/profile/1" className="btn-primary">View Profile</Link>
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
          <Link to="/messaging" className="btn-primary">Messages</Link>
          <Link to="/network" className="btn-primary">My Network</Link>
          <button 
            onClick={logout} 
            className="btn-outline text-red-600 border-red-600 hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/jobs" className="text-linkedin-blue hover:underline">
                Browse all jobs
              </Link>
            </li>
            <li>
              <Link to="/network" className="text-linkedin-blue hover:underline">
                See your connections
              </Link>
            </li>
            <li>
              <Link to="/messaging" className="text-linkedin-blue hover:underline">
                Check your messages
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Logged in as:</span> {currentUser.name}</p>
            <p><span className="font-medium">Email:</span> {currentUser.email}</p>
            <p><span className="font-medium">User ID:</span> {currentUser.id}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
            {JSON.stringify(currentUser, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
