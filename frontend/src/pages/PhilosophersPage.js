import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';
import PhilosopherCard from '../components/philosophers/PhilosopherCard';

const philosophersData = [
  {
    id: 1,
    name: 'Socrates',
    title: 'The Gadfly',
    period: 'Ancient Greece',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&crop=face',
    color: 'from-blue-400 to-blue-600',
    quote: '"The only true wisdom is in knowing you know nothing."',
    philosophy: 'Socratic Method'
  },
  {
    id: 2,
    name: 'Aristotle',
    title: 'The Stagirite',
    period: 'Ancient Greece',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    color: 'from-green-400 to-green-600',
    quote: '"We are what we repeatedly do. Excellence, then, is not an act, but a habit."',
    philosophy: 'Virtue Ethics'
  },
  {
    id: 3,
    name: 'Plato',
    title: 'The Academy',
    period: 'Ancient Greece',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    color: 'from-purple-400 to-purple-600',
    quote: '"The beginning is the most important part of the work."',
    philosophy: 'Idealism'
  },
  {
    id: 4,
    name: 'Confucius',
    title: 'The Great Teacher',
    period: 'Ancient China',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    color: 'from-orange-400 to-orange-600',
    quote: '"It does not matter how slowly you go as long as you do not stop."',
    philosophy: 'Confucianism'
  },
  {
    id: 5,
    name: 'Nietzsche',
    title: 'The Übermensch',
    period: 'Modern Philosophy',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    color: 'from-red-400 to-red-600',
    quote: '"What does not destroy me, makes me stronger."',
    philosophy: 'Existentialism'
  },
  {
    id: 6,
    name: 'Descartes',
    title: 'Father of Modern Philosophy',
    period: 'Early Modern',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    color: 'from-teal-400 to-teal-600',
    quote: '"I think, therefore I am."',
    philosophy: 'Rationalism'
  }
];

const PhilosophersPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhilosophers, setFilteredPhilosophers] = useState(philosophersData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPhilosophers(philosophersData);
    } else {
      const filtered = philosophersData.filter(philosopher =>
        philosopher.name.toLowerCase().includes(query.toLowerCase()) ||
        philosopher.philosophy.toLowerCase().includes(query.toLowerCase()) ||
        philosopher.period.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPhilosophers(filtered);
    }
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 4) >= filteredPhilosophers.length ? 0 : prev + 4);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev === 0 ? Math.max(0, filteredPhilosophers.length - 4) : Math.max(0, prev - 4));
  };

  const visiblePhilosophers = filteredPhilosophers.slice(currentIndex, currentIndex + 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              🏛️ Great Philosophers
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search philosophers..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Menu Button */}
          <button className="p-3 rounded-full hover:bg-white/50 transition-colors duration-200">
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[500px]">
            {visiblePhilosophers.map((philosopher, index) => (
              <PhilosopherCard
                key={philosopher.id}
                philosopher={philosopher}
                index={index}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          {filteredPhilosophers.length > 4 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white border border-gray-200"
                disabled={currentIndex === 0}
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white border border-gray-200"
                disabled={currentIndex + 4 >= filteredPhilosophers.length}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {filteredPhilosophers.length > 4 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: Math.ceil(filteredPhilosophers.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 4)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  Math.floor(currentIndex / 4) === index
                    ? 'bg-blue-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-center mt-16 space-x-8 text-gray-500">
          <button className="hover:text-blue-500 transition-colors duration-200 font-medium">
            📚 Philosophy
          </button>
          <button className="hover:text-blue-500 transition-colors duration-200 font-medium">
            🎭 Ethics
          </button>
          <button className="hover:text-blue-500 transition-colors duration-200 font-medium">
            🧠 Logic
          </button>
          <button className="hover:text-blue-500 transition-colors duration-200 font-medium">
            ⚡ Metaphysics
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhilosophersPage;