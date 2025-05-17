
import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const JobSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    title: '',
    location: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchParams);
    }
  };
  
  return (
    <div className="card p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:space-x-3">
          <div className="flex-1 mb-3 md:mb-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="Search job titles, skills, or companies"
            />
          </div>
          
          <div className="flex-1 mb-3 md:mb-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="City, state, or zip code"
            />
          </div>
          
          <button
            type="submit"
            className="w-full md:w-auto bg-linkedin-blue hover:bg-linkedin-darkBlue text-white font-medium py-2 px-6 rounded-md"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
