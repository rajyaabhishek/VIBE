
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CreatePostCard from '../components/feed/CreatePostCard';
import PostCard from '../components/feed/PostCard';
import FeedSidebar from '../components/feed/FeedSidebar';
import NewsSidebar from '../components/feed/NewsSidebar';
import { posts as initialPosts } from '../utils/mockData';

const HomePage = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  
  // If not logged in, show welcome page
  if (!currentUser) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Welcome to your professional community
              </h1>
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-xl mb-2">Find the right job</h3>
                    <p className="text-gray-600">
                      Explore job opportunities that match your skills and interests.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-xl mb-2">Connect with peers</h3>
                    <p className="text-gray-600">
                      Build your network and stay in touch with colleagues.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-xl mb-2">Learn new skills</h3>
                    <p className="text-gray-600">
                      Discover courses and resources to enhance your knowledge.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-medium text-xl mb-2">Share insights</h3>
                    <p className="text-gray-600">
                      Post updates and articles to demonstrate your expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:ml-auto">
              <img 
                src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" 
                alt="Professional networking" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
        {/* Left sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <FeedSidebar />
        </div>
        
        {/* Main feed */}
        <div className="lg:col-span-3">
          <CreatePostCard onPostCreated={handlePostCreated} />
          
          <div className="space-y-4 mt-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <NewsSidebar />
          
          <div className="card p-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Add to your feed</h2>
              <button className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-center text-xs font-bold">
                i
              </button>
            </div>
            
            {/* Recommendation 1 */}
            <div className="flex items-start mb-3">
              <img 
                src="https://randomuser.me/api/portraits/lego/1.jpg" 
                alt="Company Logo" 
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-medium">Tech Innovations</h3>
                <p className="text-gray-500 text-sm">Company • Technology</p>
                <button className="mt-1 border border-gray-400 text-gray-600 hover:bg-gray-100 rounded-full px-3 py-1 text-sm">
                  + Follow
                </button>
              </div>
            </div>
            
            {/* Recommendation 2 */}
            <div className="flex items-start mb-3">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Sarah Miller" 
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-medium">Sarah Miller</h3>
                <p className="text-gray-500 text-sm">UX Designer at Design Studio</p>
                <button className="mt-1 border border-gray-400 text-gray-600 hover:bg-gray-100 rounded-full px-3 py-1 text-sm">
                  + Follow
                </button>
              </div>
            </div>
            
            {/* Recommendation 3 */}
            <div className="flex items-start">
              <img 
                src="#" 
                alt="JavaScript Developers" 
                className="w-12 h-12 rounded-full bg-gray-300"
              />
              <div className="ml-3">
                <h3 className="font-medium">JavaScript Developers</h3>
                <p className="text-gray-500 text-sm">Group • 1.2M members</p>
                <button className="mt-1 border border-gray-400 text-gray-600 hover:bg-gray-100 rounded-full px-3 py-1 text-sm">
                  + Follow
                </button>
              </div>
            </div>
            
            <button className="mt-3 text-linkedin-blue hover:underline text-sm font-medium">
              View all recommendations
            </button>
          </div>
          
          <div className="mt-4 sticky top-20">
            <div className="text-center">
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">About</a>
              </div>
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">Accessibility</a>
              </div>
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">Help Center</a>
              </div>
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">Privacy & Terms</a>
              </div>
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">Ad Choices</a>
              </div>
              <div className="text-xs text-gray-500 hover:underline mb-2">
                <a href="#">Advertising</a>
              </div>
              <div className="text-xs text-gray-500 mt-3">
                LinkedIn Clone © 2023
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
