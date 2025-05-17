
import { useAuth } from '../context/AuthContext';
import PendingInvitations from '../components/network/PendingInvitations';
import ConnectionSuggestions from '../components/network/ConnectionSuggestions';
import { getUserById } from '../utils/mockData';

const NetworkStats = ({ count, title, link }) => (
  <div className="p-3 border-b border-gray-200 hover:bg-gray-50">
    <a href={link} className="flex justify-between items-center text-gray-600 hover:text-linkedin-blue">
      <span>{title}</span>
      <span className="font-medium">{count}</span>
    </a>
  </div>
);

const NetworkPage = () => {
  const { currentUser } = useAuth();
  const user = getUserById(currentUser.id);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div>
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Manage my network</h2>
            </div>
            
            <NetworkStats count={user.connections?.length || 0} title="Connections" link="#" />
            <NetworkStats count={55} title="Contacts" link="#" />
            <NetworkStats count={12} title="Following & followers" link="#" />
            <NetworkStats count={5} title="Groups" link="#" />
            <NetworkStats count={3} title="Events" link="#" />
            <NetworkStats count={8} title="Pages" link="#" />
            <NetworkStats count={18} title="Newsletters" link="#" />
            <NetworkStats count={0} title="Hashtags" link="#" />
          </div>
          
          <div className="mt-4">
            <div className="card p-4">
              <h2 className="font-medium text-gray-600 mb-2">
                Your contact import is ready
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Connect with your contacts and never lose touch.
              </p>
              <button className="w-full border border-linkedin-blue text-linkedin-blue hover:bg-blue-50 font-medium py-1.5 px-4 rounded-full">
                Continue
              </button>
            </div>
          </div>
          
          <div className="card p-4 mt-4">
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
              <div className="text-xs text-gray-500 mt-3">
                LinkedIn Clone © 2023
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <PendingInvitations currentUserId={currentUser.id} />
          <ConnectionSuggestions currentUserId={currentUser.id} />
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
