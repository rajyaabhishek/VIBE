
import { useState } from 'react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { formatDateRange } from '../../utils/formatters';

const EducationItem = ({ education, isCurrentUser, onEdit }) => {
  return (
    <div className="flex py-4 first:pt-0 border-t first:border-t-0 border-gray-200">
      <div className="mr-4">
        <div className="w-12 h-12 bg-gray-200 rounded">
          {/* School logo would go here */}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{education.school}</h3>
          {isCurrentUser && (
            <button 
              onClick={() => onEdit(education)}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <FaPencilAlt />
            </button>
          )}
        </div>
        <p className="text-gray-600">{education.degree}</p>
        <p className="text-gray-500 text-sm">
          {formatDateRange(education.startDate, education.endDate)}
        </p>
      </div>
    </div>
  );
};

const EducationSection = ({ user, isCurrentUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  
  const handleEdit = (education) => {
    setCurrentEducation(education);
    setShowAddModal(true);
  };
  
  const handleAdd = () => {
    setCurrentEducation(null);
    setShowAddModal(true);
  };
  
  const handleSave = (formData) => {
    // In a real app, we would update the user's education
    console.log('Saving education:', formData);
    setShowAddModal(false);
  };
  
  return (
    <div className="card p-6 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Education</h2>
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
        {user.education && user.education.length > 0 ? (
          user.education.map((edu) => (
            <EducationItem 
              key={edu.id} 
              education={edu} 
              isCurrentUser={isCurrentUser}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-gray-500">
            {isCurrentUser 
              ? 'Add your education to showcase your academic background.' 
              : 'No education information available.'}
          </p>
        )}
      </div>
      
      {/* Add/Edit Education Modal would go here */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              {currentEducation ? 'Edit Education' : 'Add Education'}
            </h3>
            
            {/* Form would go here */}
            <p className="text-center my-8 text-gray-500">
              Education form would appear here
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

export default EducationSection;
