
import { useState, useRef, useEffect } from 'react';
import { FaEllipsisH, FaPaperPlane, FaSmile, FaPaperclip, FaImage } from 'react-icons/fa';
import { getMessagesByConversationId, getUserById } from '../../utils/mockData';
import { formatRelativeTime } from '../../utils/formatters';

const MessageBubble = ({ message, isSender }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isSender && (
        <img 
          src={getUserById(message.senderId).profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
          alt={getUserById(message.senderId).name}
          className="w-8 h-8 rounded-full mr-2 self-end" 
        />
      )}
      
      <div className="max-w-[70%]">
        <div 
          className={`p-3 rounded-lg ${
            isSender 
              ? 'bg-linkedin-blue text-white rounded-tr-none' 
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          {message.content}
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${isSender ? 'text-right' : 'text-left'}`}>
          {formatRelativeTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({ conversation, currentUserId, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  
  // If no conversation is selected, show empty state
  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <FaPaperPlane className="text-gray-400 h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Your Messages</h3>
          <p className="text-gray-500 mt-1">
            Select a conversation or start a new one
          </p>
        </div>
      </div>
    );
  }
  
  // Get the other user in the conversation
  const otherUserId = conversation.participants.find(id => id !== currentUserId);
  const otherUser = getUserById(otherUserId);
  
  // Get messages for this conversation
  const messages = getMessagesByConversationId(conversation.id);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      conversationId: conversation.id,
      senderId: currentUserId,
      receiverId: otherUserId,
      content: messageText,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    onSendMessage(newMessage);
    setMessageText('');
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={otherUser.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
            alt={otherUser.name}
            className="w-10 h-10 rounded-full mr-3" 
          />
          <div>
            <h3 className="font-medium">{otherUser.name}</h3>
            <p className="text-gray-500 text-sm">{otherUser.headline}</p>
          </div>
        </div>
        
        <button className="text-gray-500 hover:text-gray-700 p-2">
          <FaEllipsisH />
        </button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-white">
        {messages.map(message => (
          <MessageBubble 
            key={message.id}
            message={message}
            isSender={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className="flex-1 bg-gray-100 rounded-lg p-2">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message..."
              className="w-full bg-transparent border-0 focus:ring-0 resize-none max-h-32 min-h-[40px]"
              rows={1}
            ></textarea>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button 
                  type="button"
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaSmile />
                </button>
                <button 
                  type="button"
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaImage />
                </button>
                <button 
                  type="button"
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <FaPaperclip />
                </button>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={!messageText.trim()}
            className={`ml-2 p-2 rounded-full ${
              messageText.trim() 
                ? 'bg-linkedin-blue text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
