
import { useState } from 'react';
import { FaSearch, FaEdit, FaEllipsisH } from 'react-icons/fa';
import { conversations, getUserById, getMessagesByConversationId } from '../../utils/mockData';
import { formatRelativeTime } from '../../utils/formatters';
import { truncateText } from '../../utils/helpers';

const ConversationItem = ({ conversation, isActive, currentUserId, onClick }) => {
  // Get the other user in the conversation
  const otherUserId = conversation.participants.find(id => id !== currentUserId);
  const otherUser = getUserById(otherUserId);
  
  // Get the last message
  const messages = getMessagesByConversationId(conversation.id);
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  
  // Check if the conversation has unread messages
  const hasUnread = lastMessage && lastMessage.receiverId === currentUserId && !lastMessage.read;
  
  return (
    <div 
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-blue-50' : ''}`}
      onClick={() => onClick(conversation)}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={otherUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
          alt={otherUser.name}
          className="w-12 h-12 rounded-full object-cover" 
        />
        {hasUnread && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className={`font-medium truncate ${hasUnread ? 'text-black' : 'text-gray-700'}`}>
            {otherUser.name}
          </h3>
          {lastMessage && (
            <span className="text-xs text-gray-500">
              {formatRelativeTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        {lastMessage && (
          <p className={`text-sm truncate ${hasUnread ? 'font-medium text-black' : 'text-gray-500'}`}>
            {truncateText(lastMessage.content, 40)}
          </p>
        )}
      </div>
    </div>
  );
};

const ConversationList = ({ currentUserId, activeConversation, onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter user's conversations
  const userConversations = conversations.filter(conv => 
    conv.participants.includes(currentUserId)
  );
  
  // Filter by search query if any
  const filteredConversations = searchQuery.trim() === '' 
    ? userConversations 
    : userConversations.filter(conv => {
        const otherUserId = conv.participants.find(id => id !== currentUserId);
        const otherUser = getUserById(otherUserId);
        return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
  
  // Sort conversations by last updated
  const sortedConversations = [...filteredConversations].sort((a, b) => 
    new Date(b.lastUpdated) - new Date(a.lastUpdated)
  );
  
  return (
    <div className="h-full flex flex-col border-r border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Messaging</h2>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <FaEllipsisH />
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-1">
              <FaEdit />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-linkedin-blue"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {sortedConversations.length > 0 ? (
          sortedConversations.map(conversation => (
            <ConversationItem 
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversation?.id === conversation.id}
              currentUserId={currentUserId}
              onClick={onSelectConversation}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
