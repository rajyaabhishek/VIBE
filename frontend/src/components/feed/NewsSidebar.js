
import { useState } from 'react';
import { formatRelativeTime } from '../../utils/formatters';

const newsItems = [
  {
    id: 1,
    title: "Tech Company announces new AI features",
    time: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    readers: 4572
  },
  {
    id: 2,
    title: "Remote work trends in 2023",
    time: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    readers: 2845
  },
  {
    id: 3,
    title: "Top programming languages for 2023",
    time: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    readers: 5123
  },
  {
    id: 4,
    title: "Startup raises $50M in Series B funding",
    time: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    readers: 3241
  },
  {
    id: 5,
    title: "New study reveals skills most in demand",
    time: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
    readers: 1987
  },
  {
    id: 6,
    title: "Tech layoffs slow down in Q3 2023",
    time: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
    readers: 6321
  },
  {
    id: 7,
    title: "Web development frameworks to watch",
    time: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    readers: 2756
  },
  {
    id: 8,
    title: "Cybersecurity skills shortage continues",
    time: new Date(Date.now() - 64800000).toISOString(), // 18 hours ago
    readers: 4123
  },
  {
    id: 9,
    title: "AI tools for productivity in the workplace",
    time: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    readers: 3648
  },
  {
    id: 10,
    title: "Changes in hiring practices for remote positions",
    time: new Date(Date.now() - 129600000).toISOString(), // 36 hours ago
    readers: 2934
  }
];

const NewsSidebar = () => {
  const [showMore, setShowMore] = useState(false);
  const displayItems = showMore ? newsItems : newsItems.slice(0, 5);
  
  return (
    <div className="card p-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-medium">LinkedIn News</h2>
        <button className="w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-center text-xs font-bold">
          i
        </button>
      </div>
      
      <ul className="space-y-3">
        {displayItems.map(item => (
          <li key={item.id} className="group">
            <div className="flex items-start">
              <span className="text-gray-500 font-bold mr-2 mt-1">•</span>
              <div>
                <h3 className="text-sm font-medium group-hover:text-linkedin-blue cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatRelativeTime(item.time)} • {item.readers.toLocaleString()} readers
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => setShowMore(!showMore)}
        className="mt-3 text-sm text-gray-500 font-medium hover:bg-gray-100 p-1 rounded w-full text-center"
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};

export default NewsSidebar;
