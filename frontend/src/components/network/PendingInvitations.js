
import { useState } from 'react';
import ConnectionCard from './ConnectionCard';
import { users } from '../../utils/mockData';

const PendingInvitations = ({ currentUserId }) => {
  const [pendingUsers, setPendingUsers] = useState(
    // For demo purposes, get users who are not already connections
    users.filter(user => 
      user.id !== currentUserId && 
      !users.find(u => u.id === currentUserId)?.connections?.includes(user.id)
    ).slice(0, 3) // Just take a few for demo
  );
  
  const handleAccept = (userId) => {
    console.log('Accepting invitation from user:', userId);
    // In a real app, we would update the connections in the database
  };
  
  const handleIgnore = (userId) => {
    console.log('Ignoring invitation from user:', userId);
    // In a real app, we would remove the invitation
  };
  
  if (pendingUsers.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">Invitations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pendingUsers.map(user => (
          <ConnectionCard 
            key={user.id}
            user={user}
            isPending={true}
            onAccept={handleAccept}
            onIgnore={handleIgnore}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingInvitations;
