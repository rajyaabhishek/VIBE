import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaLinkedin, 
  FaSearch, 
  FaHome, 
  FaUserFriends, 
  FaBriefcase, 
  FaCommentDots, 
  FaBell, 
  FaUserCircle,
  FaCaretDown,
  FaTh
} from 'react-icons/fa';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <FaLinkedin className="h-8 w-8 text-linkedin-blue" />
            </Link>
            
            {/* Search bar */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-linkedin-blue"
              />
            </div>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              title="Home"
            >
              <FaHome className="h-6 w-6 mb-1" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/network"
              className={`nav-link ${isActive('/network') ? 'active' : ''}`}
              title="My Network"
            >
              <FaUserFriends className="h-6 w-6 mb-1" />
              <span>My Network</span>
            </Link>
            
            <Link
              to="/jobs"
              className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}
              title="Jobs"
            >
              <FaBriefcase className="h-6 w-6 mb-1" />
              <span>Jobs</span>
            </Link>
            
            <Link
              to="/messaging"
              className={`nav-link ${isActive('/messaging') ? 'active' : ''}`}
              title="Messaging"
            >
              <div className="relative">
                <FaCommentDots className="h-6 w-6 mb-1" />
                <span className="notification-badge">2</span>
              </div>
              <span>Messaging</span>
            </Link>
            
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationsMenu(!showNotificationsMenu);
                  setShowProfileMenu(false);
                }}
                className={`nav-link ${showNotificationsMenu ? 'active' : ''}`}
                title="Notifications"
              >
                <div className="relative">
                  <FaBell className="h-6 w-6 mb-1" />
                  <span className="notification-badge">5</span>
                </div>
                <span>Notifications</span>
              </button>
              
              {showNotificationsMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-sm text-linkedin-blue hover:underline">Settings</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <div className="flex">
                          <img
                            src={`https://randomuser.me/api/portraits/women/${item + 20}.jpg`}
                            alt="User avatar"
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="text-sm">
                              <span className="font-semibold">Jane Smith</span> viewed your profile
                            </p>
                            <p className="text-xs text-gray-500 mt-1">2h ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2 text-center">
                    <button className="text-sm text-linkedin-blue hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotificationsMenu(false);
                }}
                className="nav-link border-l border-gray-200 ml-2 pl-4"
                title="Me"
              >
                <div className="flex flex-col items-center">
                  {currentUser?.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      className="h-6 w-6 rounded-full object-cover mb-1"
                    />
                  ) : (
                    <FaUserCircle className="h-6 w-6 mb-1" />
                  )}
                  <div className="flex items-center">
                    <span className="truncate max-w-[40px]">Me</span>
                    <FaCaretDown className="h-3 w-3 ml-0.5" />
                  </div>
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 animate-fadeIn">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      {currentUser?.profilePicture ? (
                        <img
                          src={currentUser.profilePicture}
                          alt={currentUser.name}
                          className="h-14 w-14 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <FaUserCircle className="h-14 w-14 text-gray-400 mr-3" />
                      )}
                      <div>
                        <h3 className="font-semibold">{currentUser?.name || 'John Doe'}</h3>
                        <p className="text-sm text-gray-600">{currentUser?.headline || 'Software Engineer'}</p>
                      </div>
                    </div>
                    <button
                      className="mt-3 w-full px-3 py-1 border border-linkedin-blue rounded-full text-sm text-linkedin-blue hover:bg-blue-50"
                      onClick={() => {
                        navigate(`/profile/${currentUser?.id || 1}`);
                        setShowProfileMenu(false);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                  
                  <div className="py-2">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-l border-gray-200 ml-2 pl-4">
              <button
                className="nav-link"
                title="Work"
              >
                <FaTh className="h-6 w-6 mb-1" />
                <div className="flex items-center">
                  <span>Work</span>
                  <FaCaretDown className="h-3 w-3 ml-0.5" />
                </div>
              </button>
            </div>
            
            <a
              href="#"
              className="text-sm text-linkedin-blue whitespace-nowrap hidden xl:block ml-2"
            >
              Try Premium for free
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/network"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Network
          </Link>
          <Link
            to="/jobs"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/messaging"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Messaging
          </Link>
          <Link
            to={`/profile/${currentUser?.id || 1}`}
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-linkedin-blue"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
