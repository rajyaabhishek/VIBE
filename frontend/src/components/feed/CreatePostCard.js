
import { useState } from 'react';
import { FaImage, FaVideo, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const CreatePostCard = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { currentUser } = useAuth();
  
  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    
    const newPost = {
      id: Date.now(),
      userId: currentUser.id,
      content: postContent,
      image: previewImage,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    };
    
    // In a real app, we would send this to an API
    console.log('New post created:', newPost);
    
    // Call the onPostCreated callback
    if (onPostCreated) {
      onPostCreated(newPost);
    }
    
    // Reset the form
    setPostContent('');
    setPreviewImage(null);
    setShowPostModal(false);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <div className="feed-card mb-4 p-4">
        <div className="flex items-center mb-3">
          <img 
            src={currentUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
            alt={currentUser.name}
            className="w-12 h-12 rounded-full mr-3" 
          />
          <button 
            onClick={() => setShowPostModal(true)}
            className="flex-1 text-left bg-gray-100 hover:bg-gray-200 rounded-full py-3 px-4 text-gray-500"
          >
            Start a post
          </button>
        </div>
        
        <div className="flex justify-between pt-2">
          <button className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md py-2 px-3 transition-colors">
            <FaImage className="mr-2 text-blue-500" />
            <span className="hidden sm:inline">Photo</span>
          </button>
          <button className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md py-2 px-3 transition-colors">
            <FaVideo className="mr-2 text-green-500" />
            <span className="hidden sm:inline">Video</span>
          </button>
          <button className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md py-2 px-3 transition-colors">
            <FaCalendarAlt className="mr-2 text-orange-500" />
            <span className="hidden sm:inline">Event</span>
          </button>
          <button className="flex items-center text-gray-600 hover:bg-gray-100 rounded-md py-2 px-3 transition-colors">
            <FaNewspaper className="mr-2 text-red-500" />
            <span className="hidden sm:inline">Article</span>
          </button>
        </div>
      </div>
      
      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create a post</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={currentUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full mr-3" 
                />
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <button className="text-sm text-gray-600 border border-gray-300 rounded-full px-3 py-1 mt-1 hover:bg-gray-100">
                    🌍 Anyone
                  </button>
                </div>
              </div>
              
              <textarea
                className="w-full border-none focus:outline-none focus:ring-0 resize-none mb-4"
                placeholder="What do you want to talk about?"
                rows={6}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
              
              {previewImage && (
                <div className="relative mb-4">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-auto rounded-lg" 
                  />
                  <button 
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <div className="flex items-center border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                    <FaImage className="h-6 w-6" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaVideo className="h-6 w-6" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaCalendarAlt className="h-6 w-6" />
                  </button>
                </div>
                
                <button
                  onClick={handlePostSubmit}
                  disabled={!postContent.trim()}
                  className={`ml-auto py-2 px-4 rounded-full ${
                    postContent.trim() 
                      ? 'bg-linkedin-blue hover:bg-linkedin-darkBlue text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostCard;
