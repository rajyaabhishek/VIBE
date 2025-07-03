import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharactersPage = () => {
  const navigate = useNavigate();

  const characters = [
    {
      id: 'sadness',
      name: 'Sadness',
      movie: 'Inside Out',
      emoji: '😢',
      backgroundColor: '#4A90B2',
      description: 'Sadness is literally the very definition and being of sorrow and gloom.'
    },
    {
      id: 'joy',
      name: 'Joy',
      movie: 'Inside Out',
      emoji: '😊',
      backgroundColor: '#FFD700',
      description: 'Joy is the protagonist of Inside Out and the main emotion of Riley.'
    },
    {
      id: 'anger',
      name: 'Anger',
      movie: 'Inside Out',
      emoji: '😡',
      backgroundColor: '#DC143C',
      description: 'Anger is one of the five emotions controlling Riley\'s mind.'
    },
    {
      id: 'fear',
      name: 'Fear',
      movie: 'Inside Out',
      emoji: '😨',
      backgroundColor: '#9370DB',
      description: 'Fear helps protect Riley by keeping her safe from potential dangers.'
    },
    {
      id: 'disgust',
      name: 'Disgust',
      movie: 'Inside Out',
      emoji: '🤢',
      backgroundColor: '#32CD32',
      description: 'Disgust helps Riley avoid things that might be harmful or unpleasant.'
    }
  ];

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">Disney</span>
              <span className="text-2xl font-light text-gray-600">Characters</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full px-4 py-2 pl-10 pr-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium">
              Menu
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disney Characters</h1>
          <p className="text-xl text-gray-600">Explore your favorite Disney characters</p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              onClick={() => handleCharacterClick(character.id)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105 transition-transform"
            >
              {/* Character Image Section */}
              <div 
                className="h-48 flex items-center justify-center relative"
                style={{ backgroundColor: character.backgroundColor }}
              >
                <div className="text-6xl">{character.emoji}</div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <span className="text-white text-xs font-bold">{character.movie}</span>
                </div>
              </div>

              {/* Character Info Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{character.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{character.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">From {character.movie}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;