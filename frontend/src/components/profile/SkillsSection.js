
import { useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';

const SkillItem = ({ skill, endorsements, isCurrentUser, onEdit }) => {
  return (
    <div className="py-3 first:pt-0 border-t first:border-t-0 border-gray-200">
      <div className="flex justify-between">
        <h3 className="font-medium">{skill}</h3>
        {isCurrentUser && (
          <button 
            onClick={() => onEdit(skill)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <FaPencilAlt />
          </button>
        )}
      </div>
      
      {endorsements && endorsements[skill] > 0 && (
        <p className="text-gray-500 text-sm mt-1">
          {endorsements[skill]} endorsement{endorsements[skill] !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

const SkillsSection = ({ user, isCurrentUser }) => {
  const [showAll, setShowAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  
  const visibleSkills = showAll ? user.skills : user.skills?.slice(0, 3);
  
  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setShowAddModal(true);
  };
  
  const handleAdd = () => {
    setCurrentSkill('');
    setShowAddModal(true);
  };
  
  const handleSave = (formData) => {
    // In a real app, we would update the user's skills
    console.log('Saving skill:', formData);
    setShowAddModal(false);
  };
  
  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Skills</h2>
        {isCurrentUser && (
          <button 
            onClick={handleAdd}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FaPlus />
          </button>
        )}
      </div>
      
      <div>
        {user.skills && user.skills.length > 0 ? (
          <>
            {visibleSkills.map((skill) => (
              <SkillItem 
                key={skill} 
                skill={skill} 
                endorsements={user.endorsements}
                isCurrentUser={isCurrentUser}
                onEdit={handleEdit}
              />
            ))}
            
            {user.skills.length > 3 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="mt-3 text-linkedin-blue hover:underline font-medium"
              >
                {showAll ? 'Show less' : `Show all ${user.skills.length} skills`}
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500">
            {isCurrentUser 
              ? 'Add your skills to showcase your abilities to recruiters and your network.' 
              : 'No skills information available.'}
          </p>
        )}
      </div>
      
      {/* Add/Edit Skill Modal would go here */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {currentSkill ? 'Edit Skill' : 'Add Skill'}
            </h3>
            
            {/* Form would go here */}
            <p className="text-center my-8 text-gray-500">
              Skill form would appear here
            </p>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleSave({});
                }}
                className="px-4 py-2 bg-linkedin-blue text-white rounded-md hover:bg-linkedin-darkBlue"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
