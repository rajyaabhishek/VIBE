import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage, FaFile, FaSmile, FaEllipsisH } from 'react-icons/fa';
import { getMessagesByConversationId, getUserById } from '../../utils/mockData';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const MessageThread = ({ conversation }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const otherParticipantId = conversation?.participants.find(id => id !== currentUser.id);
  const otherUser = otherParticipantId ? getUserById(otherParticipantId) : null;

  useEffect(() => {
    if (conversation) {
      const threadMessages = getMessagesByConversationId(conversation.id);
      setMessages(threadMessages);
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Create a new message
    const newMessage = {
      id: messages.length + 1,
      conversationId: conversation.id,
      senderId: currentUser.id,
      receiverId: otherUser.id,
      content: message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add to messages array
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    
    return Object.entries(groups).map(([date, msgs]) => ({
      date,
      messages: msgs
    }));
  };

  const messageGroups = groupMessagesByDate(messages);

  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp), 'h:mm a');
  };

  if (!conversation || !otherUser) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a conversation from the list or start a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="relative">
          <img 
            src={otherUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"}
            alt={otherUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          {otherUser.active && (
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium">{otherUser.name}</h3>
          <p className="text-xs text-gray-500">{otherUser.headline}</p>
        </div>
        
        <div className="relative">
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowMenu(!showMenu)}
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
                  View profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  Archive conversation
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  Mark as unread
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">
                  {new Date(group.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: new Date(group.date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                  })}
                </span>
              </div>
            </div>
            
            {group.messages.map((msg, msgIndex) => {
              const isMine = msg.senderId === currentUser.id;
              
              return (
                <div key={`${group.date}-${msgIndex}`} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`relative max-w-lg ${isMine ? 'bg-linkedin-blue text-white' : 'bg-gray-100'} px-4 py-2 rounded-lg shadow-sm`}>
                    <div className="text-sm">
                      {msg.content}
                    </div>
                    <div className={`text-xs mt-1 ${isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatMessageTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className="flex-1 border border-gray-300 rounded-lg bg-white">
            <div className="px-3 py-2">
              <textarea
                rows="1"
                placeholder="Write a message..."
                className="w-full border-none focus:ring-0 resize-none outline-none text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 border-t border-gray-200">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <FaImage className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <FaFile className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FaSmile className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="ml-2 px-3 py-2 bg-linkedin-blue text-white rounded-full hover:bg-linkedin-darkBlue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageThread;
