
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FeedSidebar = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="card overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-linkedin-blue to-blue-400"></div>
        <div className="p-4 pt-0 text-center">
          <div className="-mt-10 mb-3">
            <Link to={`/profile/${currentUser.id}`}>
              <img 
                src={currentUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
                alt={currentUser.name}
                className="w-16 h-16 rounded-full border-2 border-white mx-auto" 
              />
            </Link>
          </div>
          <Link to={`/profile/${currentUser.id}`} className="font-medium text-black hover:underline block">
            {currentUser.name}
          </Link>
          <p className="text-gray-500 text-sm mt-1">{currentUser.headline}</p>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="p-3 hover:bg-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Who's viewed your profile</span>
              <span className="text-linkedin-blue font-medium">38</span>
            </div>
          </div>
          <div className="p-3 hover:bg-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Impressions of your post</span>
              <span className="text-linkedin-blue font-medium">143</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-3 hover:bg-gray-100">
          <div className="text-sm">
            <span className="text-gray-500">Access exclusive tools & insights</span>
            <div className="flex items-center mt-1">
              <div className="h-4 w-4 bg-amber-500 rounded-sm mr-2"></div>
              <span className="font-medium">Try Premium for free</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-3 hover:bg-gray-100">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 text-gray-500">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">My items</span>
          </div>
        </div>
      </div>
      
      {/* Recent */}
      <div className="card p-3">
        <div className="space-y-1">
          <h2 className="text-sm font-medium mb-2">Recent</h2>
          
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span className="text-gray-500 text-sm mr-3">#</span>
            <span className="text-sm">javascript</span>
          </div>
          
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span className="text-gray-500 text-sm mr-3">#</span>
            <span className="text-sm">webdevelopment</span>
          </div>
          
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span className="text-gray-500 text-sm mr-3">#</span>
            <span className="text-sm">reactjs</span>
          </div>
          
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span className="text-gray-500 text-sm mr-3">#</span>
            <span className="text-sm">programming</span>
          </div>
          
          <div className="flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            <span className="text-gray-500 text-sm mr-3">#</span>
            <span className="text-sm">frontend</span>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-gray-200">
          <button className="text-sm text-gray-500 font-medium hover:text-linkedin-blue">
            Groups
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <button className="text-sm text-gray-500 font-medium hover:text-linkedin-blue">
            Events
          </button>
          <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
            +
          </button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button className="text-sm text-gray-500 font-medium hover:text-linkedin-blue">
            Followed Hashtags
          </button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button className="w-full text-center text-sm text-gray-500 font-medium hover:text-linkedin-blue py-1">
            Discover more
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedSidebar;
