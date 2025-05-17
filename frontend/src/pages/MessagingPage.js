import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConversationList from '../components/messaging/ConversationList';
import MessageThread from '../components/messaging/MessageThread';
import { useAuth } from '../context/AuthContext';
import { conversations } from '../utils/mockData';

const MessagingPage = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Find the initial conversation if conversationId is provided
  const initialConversation = conversationId 
    ? conversations.find(c => c.id === parseInt(conversationId, 10))
    : conversations.find(c => c.participants.includes(currentUser.id));
  
  const [selectedConversation, setSelectedConversation] = useState(initialConversation);
  
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    navigate(`/messaging/${conversation.id}`);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-0">
      <div className="bg-white shadow-sm rounded-lg h-[calc(100vh-130px)] mt-4 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div className="md:col-span-1 border-r border-gray-200 h-full overflow-hidden">
            <ConversationList 
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          
          <div className="md:col-span-2 h-full overflow-hidden">
            <MessageThread conversation={selectedConversation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
