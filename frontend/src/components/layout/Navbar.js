
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSearch, FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell } from 'react-icons/fa';
import { getNotificationsByUserId } from '../../utils/mockData';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = currentUser ? getNotificationsByUserId(currentUser.id) : [];
  const unreadNotifications = notifications.filter(notification => !notification.read);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, we would redirect to search results
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14">
          {/* Left side - Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="https://static.licdn.com/aero-v1/sc/h/3l0lp7rshx22z6brbq1k4bhml" 
                alt="LinkedIn" 
                className="h-8 w-auto"
              />
            </Link>
            
            <div className="hidden md:block relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-500" />
                </div>
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-linkedin-blue sm:text-sm"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          {currentUser ? (
            <div className="flex items-center space-x-1 md:space-x-4">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <FaHome className="h-5 w-5" />
                <span className="text-xs hidden sm:block">Home</span>
              </Link>
              <Link to="/network" className={`nav-link ${isActive('/network') ? 'active' : ''}`}>
                <FaUserFriends className="h-5 w-5" />
                <span className="text-xs hidden sm:block">My Network</span>
              </Link>
              <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}>
                <FaBriefcase className="h-5 w-5" />
                <span className="text-xs hidden sm:block">Jobs</span>
              </Link>
              <Link to="/messaging" className={`nav-link ${isActive('/messaging') ? 'active' : ''}`}>
                <FaEnvelope className="h-5 w-5" />
                <span className="text-xs hidden sm:block">Messaging</span>
              </Link>
              <div className="nav-link relative">
                <FaBell className="h-5 w-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
                <span className="text-xs hidden sm:block">Notifications</span>
              </div>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex flex-col items-center focus:outline-none"
                >
                  <img
                    className="h-7 w-7 rounded-full object-cover"
                    src={currentUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"}
                    alt={currentUser.name}
                  />
                  <span className="text-xs hidden sm:flex items-center">
                    Me
                    <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                
                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 truncate">{currentUser.headline}</p>
                      </div>
                      <Link 
                        to={`/profile/${currentUser.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-linkedin-blue hover:text-linkedin-darkBlue">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Join now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
