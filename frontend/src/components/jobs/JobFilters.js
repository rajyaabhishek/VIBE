
import { useState } from 'react';

const JobFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    datePosted: '',
    experience: [],
    workplaceType: [],
    jobType: [],
    salary: ''
  });
  
  const handleDateChange = (e) => {
    const { value } = e.target;
    const newFilters = {
      ...filters,
      datePosted: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    let updatedCategory = [...filters[category]];
    
    if (checked) {
      updatedCategory.push(value);
    } else {
      updatedCategory = updatedCategory.filter(item => item !== value);
    }
    
    const newFilters = {
      ...filters,
      [category]: updatedCategory
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSalaryChange = (e) => {
    const { value } = e.target;
    const newFilters = {
      ...filters,
      salary: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="card p-4 divide-y divide-gray-200">
      {/* Date Posted */}
      <div className="py-3">
        <h3 className="font-medium mb-2">Date Posted</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="any-time"
              name="datePosted"
              value=""
              checked={filters.datePosted === ''}
              onChange={handleDateChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="any-time" className="ml-2 text-gray-700">
              Any time
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="past-month"
              name="datePosted"
              value="past-month"
              checked={filters.datePosted === 'past-month'}
              onChange={handleDateChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="past-month" className="ml-2 text-gray-700">
              Past month
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="past-week"
              name="datePosted"
              value="past-week"
              checked={filters.datePosted === 'past-week'}
              onChange={handleDateChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="past-week" className="ml-2 text-gray-700">
              Past week
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="past-24h"
              name="datePosted"
              value="past-24h"
              checked={filters.datePosted === 'past-24h'}
              onChange={handleDateChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="past-24h" className="ml-2 text-gray-700">
              Past 24 hours
            </label>
          </div>
        </div>
      </div>
      
      {/* Experience Level */}
      <div className="py-3">
        <h3 className="font-medium mb-2">Experience Level</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="internship"
              value="internship"
              checked={filters.experience.includes('internship')}
              onChange={(e) => handleCheckboxChange(e, 'experience')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="internship" className="ml-2 text-gray-700">
              Internship
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="entry-level"
              value="entry-level"
              checked={filters.experience.includes('entry-level')}
              onChange={(e) => handleCheckboxChange(e, 'experience')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="entry-level" className="ml-2 text-gray-700">
              Entry level
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mid-level"
              value="mid-level"
              checked={filters.experience.includes('mid-level')}
              onChange={(e) => handleCheckboxChange(e, 'experience')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="mid-level" className="ml-2 text-gray-700">
              Mid-Senior level
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="director"
              value="director"
              checked={filters.experience.includes('director')}
              onChange={(e) => handleCheckboxChange(e, 'experience')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="director" className="ml-2 text-gray-700">
              Director
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="executive"
              value="executive"
              checked={filters.experience.includes('executive')}
              onChange={(e) => handleCheckboxChange(e, 'experience')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="executive" className="ml-2 text-gray-700">
              Executive
            </label>
          </div>
        </div>
      </div>
      
      {/* Workplace Type */}
      <div className="py-3">
        <h3 className="font-medium mb-2">Workplace Type</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="on-site"
              value="on-site"
              checked={filters.workplaceType.includes('on-site')}
              onChange={(e) => handleCheckboxChange(e, 'workplaceType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="on-site" className="ml-2 text-gray-700">
              On-site
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remote"
              value="remote"
              checked={filters.workplaceType.includes('remote')}
              onChange={(e) => handleCheckboxChange(e, 'workplaceType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="remote" className="ml-2 text-gray-700">
              Remote
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hybrid"
              value="hybrid"
              checked={filters.workplaceType.includes('hybrid')}
              onChange={(e) => handleCheckboxChange(e, 'workplaceType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="hybrid" className="ml-2 text-gray-700">
              Hybrid
            </label>
          </div>
        </div>
      </div>
      
      {/* Job Type */}
      <div className="py-3">
        <h3 className="font-medium mb-2">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="full-time"
              value="full-time"
              checked={filters.jobType.includes('full-time')}
              onChange={(e) => handleCheckboxChange(e, 'jobType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="full-time" className="ml-2 text-gray-700">
              Full-time
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="part-time"
              value="part-time"
              checked={filters.jobType.includes('part-time')}
              onChange={(e) => handleCheckboxChange(e, 'jobType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="part-time" className="ml-2 text-gray-700">
              Part-time
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="contract"
              value="contract"
              checked={filters.jobType.includes('contract')}
              onChange={(e) => handleCheckboxChange(e, 'jobType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="contract" className="ml-2 text-gray-700">
              Contract
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="temporary"
              value="temporary"
              checked={filters.jobType.includes('temporary')}
              onChange={(e) => handleCheckboxChange(e, 'jobType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="temporary" className="ml-2 text-gray-700">
              Temporary
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="internship-job"
              value="internship"
              checked={filters.jobType.includes('internship')}
              onChange={(e) => handleCheckboxChange(e, 'jobType')}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="internship-job" className="ml-2 text-gray-700">
              Internship
            </label>
          </div>
        </div>
      </div>
      
      {/* Salary Range */}
      <div className="py-3">
        <h3 className="font-medium mb-2">Salary Range</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="any-salary"
              name="salary"
              value=""
              checked={filters.salary === ''}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="any-salary" className="ml-2 text-gray-700">
              Any
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="salary-40k"
              name="salary"
              value="40k-"
              checked={filters.salary === '40k-'}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="salary-40k" className="ml-2 text-gray-700">
              $40,000+
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="salary-60k"
              name="salary"
              value="60k-"
              checked={filters.salary === '60k-'}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="salary-60k" className="ml-2 text-gray-700">
              $60,000+
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="salary-80k"
              name="salary"
              value="80k-"
              checked={filters.salary === '80k-'}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="salary-80k" className="ml-2 text-gray-700">
              $80,000+
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="salary-100k"
              name="salary"
              value="100k-"
              checked={filters.salary === '100k-'}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="salary-100k" className="ml-2 text-gray-700">
              $100,000+
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="salary-120k"
              name="salary"
              value="120k-"
              checked={filters.salary === '120k-'}
              onChange={handleSalaryChange}
              className="h-4 w-4 text-linkedin-blue focus:ring-linkedin-blue"
            />
            <label htmlFor="salary-120k" className="ml-2 text-gray-700">
              $120,000+
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
