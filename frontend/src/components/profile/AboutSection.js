
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const AboutSection = ({ user, isCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(user.about || '');
  
  const handleSave = () => {
    // In a real app, we would update the user's about text
    console.log('Saving about text:', aboutText);
    setIsEditing(false);
  };
  
  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">About</h2>
        {isCurrentUser && !isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FaPencilAlt />
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            rows={5}
            placeholder="Tell us about yourself..."
          ></textarea>
          
          <div className="flex justify-end space-x-2 mt-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-linkedin-blue text-white rounded-md hover:bg-linkedin-darkBlue"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700 whitespace-pre-line">
          {user.about || (isCurrentUser ? 'Add a summary about yourself...' : 'No about information available.')}
        </div>
      )}
    </div>
  );
};

export default AboutSection;
