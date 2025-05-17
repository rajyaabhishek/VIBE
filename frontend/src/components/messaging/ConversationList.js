import { useState } from 'react';
import { FaSearch, FaEdit, FaEllipsisH } from 'react-icons/fa';
import { conversations, getUserById, getMessagesByConversationId } from '../../utils/mockData';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const ConversationList = ({ selectedConversation, onSelectConversation }) => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Filter conversations that the current user is part of
  const userConversations = conversations.filter(conversation =>
    conversation.participants.includes(currentUser.id)
  );

  // Filter by search query
  const filteredConversations = userConversations.filter(conversation => {
    const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
    const otherUser = getUserById(otherParticipantId);
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get the last message for each conversation
  const conversationsWithLastMessage = filteredConversations.map(conversation => {
    const messages = getMessagesByConversationId(conversation.id);
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
    const otherUser = getUserById(otherParticipantId);
    
    return {
      ...conversation,
      lastMessage,
      otherUser
    };
  });

  // Sort conversations by last message timestamp
  const sortedConversations = [...conversationsWithLastMessage].sort((a, b) => {
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp);
  });

  return (
    <div className="border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Messaging</h2>
          <div className="flex space-x-2">
            <button 
              className="text-gray-500 hover:text-gray-700"
              aria-label="New message"
            >
              <FaEdit className="h-5 w-5" />
            </button>
            <div className="relative">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="More options"
              >
                <FaEllipsisH className="h-5 w-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Mark all as read
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Manage messages
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowMenu(false)}
                    >
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages"
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.length > 0 ? (
          sortedConversations.map(conversation => {
            const isSelected = selectedConversation?.id === conversation.id;
            const isUnread = conversation.lastMessage && 
                           conversation.lastMessage.receiverId === currentUser.id && 
                           !conversation.lastMessage.read;
            
            return (
              <div 
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                  isSelected ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={conversation.otherUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"}
                      alt={conversation.otherUser.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {conversation.otherUser.active && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className={`text-sm font-medium truncate ${isUnread ? 'text-black font-semibold' : 'text-gray-900'}`}>
                        {conversation.otherUser.name}
                      </h3>
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: false })}
                        </span>
                      )}
                    </div>
                    
                    {conversation.lastMessage ? (
                      <p className={`text-sm truncate ${isUnread ? 'text-black font-semibold' : 'text-gray-500'}`}>
                        {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                        {conversation.lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No messages yet
                      </p>
                    )}
                  </div>
                  
                  {isUnread && (
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-500">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
