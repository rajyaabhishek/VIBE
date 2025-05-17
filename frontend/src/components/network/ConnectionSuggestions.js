
import { useState } from 'react';
import ConnectionCard from './ConnectionCard';
import { users } from '../../utils/mockData';

const ConnectionSuggestions = ({ currentUserId }) => {
  const [suggestedUsers, setSuggestedUsers] = useState(
    // For demo purposes, get users who are not already connections
    users.filter(user => 
      user.id !== currentUserId && 
      !users.find(u => u.id === currentUserId)?.connections?.includes(user.id)
    ).slice(3, 9) // Just take a few for demo, different from pending
  );
  
  const handleConnect = (userId) => {
    console.log('Sending connection request to user:', userId);
    // In a real app, we would send a connection request
  };
  
  const handleWithdraw = (userId) => {
    console.log('Withdrawing connection request to user:', userId);
    // In a real app, we would withdraw the connection request
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">People you may know</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestedUsers.map(user => (
          <ConnectionCard 
            key={user.id}
            user={user}
            onConnect={handleConnect}
            onWithdraw={handleWithdraw}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectionSuggestions;
