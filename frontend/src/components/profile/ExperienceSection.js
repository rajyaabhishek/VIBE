
import { useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { formatDateRange } from '../../utils/formatters';

const ExperienceItem = ({ experience, isCurrentUser, onEdit }) => {
  return (
    <div className="flex py-4 first:pt-0 border-t first:border-t-0 border-gray-200">
      <div className="mr-4">
        <div className="w-12 h-12 bg-gray-200 rounded">
          {/* Company logo would go here */}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{experience.title}</h3>
          {isCurrentUser && (
            <button 
              onClick={() => onEdit(experience)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <FaPencilAlt />
            </button>
          )}
        </div>
        <p className="text-gray-600">{experience.company}</p>
        <p className="text-gray-500 text-sm">
          {formatDateRange(experience.startDate, experience.endDate)}
        </p>
        <p className="text-gray-500 text-sm">{experience.location}</p>
        
        {experience.description && (
          <p className="mt-2 text-gray-700">{experience.description}</p>
        )}
      </div>
    </div>
  );
};

const ExperienceSection = ({ user, isCurrentUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  
  const handleEdit = (experience) => {
    setCurrentExperience(experience);
    setShowAddModal(true);
  };
  
  const handleAdd = () => {
    setCurrentExperience(null);
    setShowAddModal(true);
  };
  
  const handleSave = (formData) => {
    // In a real app, we would update the user's experience
    console.log('Saving experience:', formData);
    setShowAddModal(false);
  };
  
  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Experience</h2>
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
        {user.experience && user.experience.length > 0 ? (
          user.experience.map((exp) => (
            <ExperienceItem 
              key={exp.id} 
              experience={exp} 
              isCurrentUser={isCurrentUser}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-gray-500">
            {isCurrentUser 
              ? 'Add your work experience to showcase your professional journey.' 
              : 'No experience information available.'}
          </p>
        )}
      </div>
      
      {/* Add/Edit Experience Modal would go here */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {currentExperience ? 'Edit Experience' : 'Add Experience'}
            </h3>
            
            {/* Form would go here */}
            <p className="text-center my-8 text-gray-500">
              Experience form would appear here
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

export default ExperienceSection;
