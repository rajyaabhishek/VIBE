import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaSlidersH } from 'react-icons/fa';

const JobSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    remote: false,
    easyApply: false,
    datePosted: 'anytime',
    experience: [],
    salary: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword, location, ...filters });
  };

  const handleFilterChange = (filter, value) => {
    if (filter === 'remote' || filter === 'easyApply') {
      setFilters(prev => ({ ...prev, [filter]: value }));
    } else if (filter === 'datePosted') {
      setFilters(prev => ({ ...prev, datePosted: value }));
    } else if (filter === 'experience' || filter === 'salary') {
      if (filters[filter].includes(value)) {
        setFilters(prev => ({
          ...prev,
          [filter]: prev[filter].filter(item => item !== value)
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [filter]: [...prev[filter], value]
        }));
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search job titles, companies, or keywords"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location (city, state, or remote)"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            >
              <FaSlidersH className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-linkedin-blue hover:bg-linkedin-darkBlue focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            >
              Search
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Date Posted</h3>
                <div className="space-y-2">
                  {[
                    { value: 'anytime', label: 'Any time' },
                    { value: 'month', label: 'Past month' },
                    { value: 'week', label: 'Past week' },
                    { value: 'day', label: 'Past 24 hours' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded-full"
                        checked={filters.datePosted === option.value}
                        onChange={() => handleFilterChange('datePosted', option.value)}
                      />
                      <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Experience Level</h3>
                <div className="space-y-2">
                  {[
                    { value: 'internship', label: 'Internship' },
                    { value: 'entry', label: 'Entry level' },
                    { value: 'associate', label: 'Associate' },
                    { value: 'mid-senior', label: 'Mid-Senior level' },
                    { value: 'director', label: 'Director' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded"
                        checked={filters.experience.includes(option.value)}
                        onChange={() => handleFilterChange('experience', option.value)}
                      />
                      <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Job Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded"
                        checked={filters.remote}
                        onChange={() => handleFilterChange('remote', !filters.remote)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Remote</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded"
                        checked={filters.easyApply}
                        onChange={() => handleFilterChange('easyApply', !filters.easyApply)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Easy Apply</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Salary Range</h3>
                  <div className="space-y-2">
                    {[
                      { value: '0-50', label: '$0 - $50,000' },
                      { value: '50-100', label: '$50,000 - $100,000' },
                      { value: '100-150', label: '$100,000 - $150,000' },
                      { value: '150+', label: '$150,000+' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue rounded"
                          checked={filters.salary.includes(option.value)}
                          onChange={() => handleFilterChange('salary', option.value)}
                        />
                        <span className="ml-2 text-sm text-gray-600">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobSearch;
