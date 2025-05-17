
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ConversationList from '../components/messaging/ConversationList';
import ChatWindow from '../components/messaging/ChatWindow';
import { conversations, messages as initialMessages } from '../utils/mockData';

const MessagingPage = () => {
  const { currentUser } = useAuth();
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };
  
  const handleSendMessage = (newMessage) => {
    // In a real app, we would send this to an API
    setMessages([...messages, newMessage]);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-0 md:px-4 h-[calc(100vh-56px)]">
      <div className="bg-white h-full rounded-t-none md:rounded-t-lg shadow overflow-hidden flex flex-col md:flex-row">
        {/* Conversation sidebar */}
        <div className="w-full md:w-96 border-r border-gray-200 flex-shrink-0 h-1/2 md:h-full overflow-hidden">
          <ConversationList 
            currentUserId={currentUser.id}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        {/* Chat window */}
        <div className="flex-1 h-1/2 md:h-full overflow-hidden">
          <ChatWindow 
            conversation={activeConversation}
            currentUserId={currentUser.id}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
