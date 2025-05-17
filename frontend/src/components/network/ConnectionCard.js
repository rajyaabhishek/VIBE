
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/helpers';

const ConnectionCard = ({ user, isPending = false, onAccept, onIgnore, onWithdraw, onConnect }) => {
  const [status, setStatus] = useState(isPending ? 'pending' : null);
  const [connectionSent, setConnectionSent] = useState(false);
  
  const handleAccept = () => {
    if (onAccept) {
      onAccept(user.id);
    }
    setStatus('connected');
  };
  
  const handleIgnore = () => {
    if (onIgnore) {
      onIgnore(user.id);
    }
    setStatus('ignored');
  };
  
  const handleWithdraw = () => {
    if (onWithdraw) {
      onWithdraw(user.id);
    }
    setStatus(null);
  };
  
  const handleConnect = () => {
    if (onConnect) {
      onConnect(user.id);
    }
    setConnectionSent(true);
  };
  
  return (
    <div className="card p-4">
      <div className="flex items-start">
        <Link to={`/profile/${user.id}`} className="flex-shrink-0">
          <img 
            src={user.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover" 
          />
        </Link>
        
        <div className="ml-3 flex-1">
          <Link to={`/profile/${user.id}`} className="font-medium text-black hover:underline">
            {user.name}
          </Link>
          <p className="text-gray-600 text-sm">{user.headline}</p>
          <p className="text-gray-500 text-xs mt-1">{user.location}</p>
          
          {/* Mutual connections would go here */}
          <p className="text-gray-500 text-xs mt-1">
            {Math.floor(Math.random() * 10) + 1} mutual connections
          </p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {status === 'connected' ? (
              <span className="text-green-600 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected
              </span>
            ) : status === 'ignored' ? (
              <span className="text-gray-500">Invitation declined</span>
            ) : status === 'pending' ? (
              <>
                <button 
                  onClick={handleAccept}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  Accept
                </button>
                <button 
                  onClick={handleIgnore}
                  className="border border-gray-300 rounded-full py-1 px-3 text-gray-600 hover:bg-gray-50 text-sm"
                >
                  Ignore
                </button>
              </>
            ) : connectionSent ? (
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Pending</span>
                <button 
                  onClick={handleWithdraw}
                  className="text-linkedin-blue hover:underline text-sm"
                >
                  Withdraw
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                className="border border-linkedin-blue text-linkedin-blue hover:bg-blue-50 rounded-full py-1 px-4 text-sm font-medium"
              >
                Connect
              </button>
            )}
            
            {((status !== 'pending' && !connectionSent) || status === 'connected') && (
              <button className="text-gray-500 border border-gray-300 hover:bg-gray-50 rounded-full py-1 px-4 text-sm">
                Message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
