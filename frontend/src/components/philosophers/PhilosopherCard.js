import React, { useState } from 'react';

const PhilosopherCard = ({ philosopher, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`relative transform transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 -translate-y-2' : ''
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-80 w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br ${philosopher.color} cursor-pointer transition-all duration-300 ${
          isHovered ? 'shadow-2xl' : 'shadow-xl'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20"></div>
          <div className="absolute bottom-8 left-4 w-8 h-8 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 left-8 w-4 h-4 rounded-full bg-white/10"></div>
        </div>

        {/* Philosopher Image */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <img
              src={philosopher.image}
              alt={philosopher.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-1 text-center drop-shadow-lg">
            {philosopher.name}
          </h2>
          <p className="text-sm opacity-90 text-center mb-2 font-medium">
            {philosopher.title}
          </p>
          <p className="text-xs opacity-75 text-center mb-3">
            {philosopher.period}
          </p>
          
          {/* Philosophy Badge */}
          <div className="flex justify-center">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium border border-white/30">
              {philosopher.philosophy}
            </span>
          </div>
        </div>

        {/* Hover Quote Overlay */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-center text-white">
            <p className="text-sm italic mb-4 leading-relaxed">
              {philosopher.quote}
            </p>
            <div className="w-12 h-px bg-white/50 mx-auto mb-3"></div>
            <p className="text-xs opacity-75 uppercase tracking-wider">
              - {philosopher.name}
            </p>
          </div>
        </div>

        {/* Floating Action Button */}
        <div
          className={`absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-110 bg-white/30' : ''
          }`}
        >
          <span className="text-white text-lg">📖</span>
        </div>
      </div>

      {/* Bottom Shadow */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/10 rounded-3xl blur-md -z-10"></div>
    </div>
  );
};

export default PhilosopherCard;