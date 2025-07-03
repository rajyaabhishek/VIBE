import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample character data - in a real app this would come from an API
  const characters = {
    sadness: {
      id: 'sadness',
      name: 'Sadness',
      movie: 'Inside Out',
      emoji: '😢',
      description: 'Sadness is literally the very definition and being of sorrow and gloom. She is hardly ever used because Joy is the boss and doesn\'t want Riley to ever be sad, even when she needs to be. Because of this, Joy treats Sadness badly.',
      backgroundColor: '#4A90B2',
      textColor: 'white'
    },
    joy: {
      id: 'joy',
      name: 'Joy',
      movie: 'Inside Out',
      emoji: '😊',
      description: 'Joy is the protagonist of Inside Out. She is the yellow Emotion and the main Emotion out of the five that live inside the mind of Riley Andersen.',
      backgroundColor: '#FFD700',
      textColor: 'black'
    },
    anger: {
      id: 'anger',
      name: 'Anger',
      movie: 'Inside Out',
      emoji: '😡',
      description: 'Anger is one of the five emotions controlling Riley\'s mind. He has a fiery spirit and gets frustrated when things don\'t go Riley\'s way.',
      backgroundColor: '#DC143C',
      textColor: 'white'
    },
    fear: {
      id: 'fear',
      name: 'Fear',
      movie: 'Inside Out',
      emoji: '😨',
      description: 'Fear helps protect Riley by keeping her safe from potential dangers. He is constantly worried about what could go wrong.',
      backgroundColor: '#9370DB',
      textColor: 'white'
    },
    disgust: {
      id: 'disgust',
      name: 'Disgust',
      movie: 'Inside Out',
      emoji: '🤢',
      description: 'Disgust helps Riley avoid things that might be harmful or unpleasant. She has strong opinions about everything.',
      backgroundColor: '#32CD32',
      textColor: 'white'
    }
  };

  const character = characters[id] || characters.sadness;

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
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Menu
            </button>
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm">
          <div className="p-6">
            <div className="transform -rotate-90 origin-center">
              <h2 className="text-xl font-semibold text-gray-700 whitespace-nowrap">{character.name}</h2>
            </div>
          </div>
          <div className="p-6 mt-8">
            <div className="transform -rotate-90 origin-center">
              <h3 className="text-sm text-gray-500 whitespace-nowrap">Inside Out</h3>
            </div>
          </div>
        </div>

        {/* Character Detail Content */}
        <div className="flex-1 flex">
          {/* Character Image */}
          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="relative">
              <div 
                className="w-80 h-80 rounded-full flex items-center justify-center"
                style={{ backgroundColor: character.backgroundColor }}
              >
                <div className="w-72 h-72 rounded-full flex items-center justify-center text-8xl">
                  {character.emoji}
                </div>
              </div>
            </div>
          </div>

          {/* Character Information */}
          <div 
            className="w-1/2 p-8 flex flex-col justify-center relative"
            style={{ backgroundColor: character.backgroundColor, color: character.textColor }}
          >
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-4">{character.name}</h1>
              
              <div className="mb-6">
                <span className="text-sm font-medium opacity-90">Movie </span>
                <span className="text-lg font-semibold">{character.movie}</span>
                <div className="inline-block ml-4 px-3 py-1 bg-white bg-opacity-20 rounded-full">
                  <span className="text-sm font-bold">INSIDE OUT</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg leading-relaxed opacity-95">
                  {character.description}
                </p>
              </div>
            </div>

            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
            <div className="absolute bottom-8 right-8 w-16 h-16 opacity-10">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;