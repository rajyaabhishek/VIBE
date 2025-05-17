
import { useState } from 'react';
import { FaCamera, FaPencilAlt, FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const ProfileHeader = ({ user, isCurrentUser }) => {
  const [showEditPhoto, setShowEditPhoto] = useState(false);
  const { updateProfile } = useAuth();
  
  const handleEditPhoto = () => {
    // In a real app, we would open a file picker and upload the image
    console.log('Editing profile photo');
  };
  
  return (
    <div className="card relative mb-4">
      {/* Background image */}
      <div className="h-40 bg-gray-200 relative">
        {user.backgroundImage ? (
          <img 
            src={user.backgroundImage} 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
        )}
        
        {isCurrentUser && (
          <button className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100">
            <FaCamera className="text-gray-600" />
          </button>
        )}
      </div>
      
      {/* Profile photo */}
      <div className="absolute left-8 -bottom-16">
        <div 
          className="relative"
          onMouseEnter={() => setShowEditPhoto(true)}
          onMouseLeave={() => setShowEditPhoto(false)}
        >
          <img 
            src={user.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-white object-cover" 
          />
          
          {isCurrentUser && showEditPhoto && (
            <button 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full"
              onClick={handleEditPhoto}
            >
              <FaCamera className="text-white text-xl" />
            </button>
          )}
        </div>
      </div>
      
      {/* Profile actions */}
      <div className="flex justify-end p-4">
        {isCurrentUser ? (
          <button className="flex items-center text-linkedin-blue border border-linkedin-blue rounded-full px-3 py-1 hover:bg-blue-50">
            <FaPencilAlt className="mr-1" />
            Edit profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button className="btn-primary px-4">Connect</button>
            <button className="btn-outline px-4">Message</button>
            <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100">
              <FaEllipsisH />
            </button>
          </div>
        )}
      </div>
      
      {/* Profile info */}
      <div className="p-4 pt-20">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-700 mt-1">{user.headline}</p>
        <p className="text-gray-500 text-sm mt-1">{user.location}</p>
        
        <div className="flex items-center mt-2 text-sm">
          <button className="text-linkedin-blue font-medium hover:underline">
            {user.connections?.length || 0} connections
          </button>
          
          {user.connections?.length > 0 && (
            <div className="flex ml-4">
              <div className="flex -space-x-2">
                {/* We'd normally map through user connections here */}
                <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-500 border border-white"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-linkedin-blue text-white px-4 py-1 rounded-full text-sm font-medium">
            Open to
          </button>
          <button className="border border-linkedin-blue text-linkedin-blue px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-50">
            Add profile section
          </button>
          <button className="border border-gray-300 text-gray-500 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-50">
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
