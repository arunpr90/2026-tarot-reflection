
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-20 animate-fade-in">
      <div className="p-4 bg-indigo-50 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      </div>
      <h1 className="serif text-5xl md:text-7xl font-bold text-slate-800 leading-tight">
        How will my <br/> <span className="text-indigo-600">2026</span> be?
      </h1>
      <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
        A simple tarot-style reflection for your year ahead. Gain perspective and clarity on the themes awaiting you.
      </p>
      <button 
        onClick={onStart}
        className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-xl shadow-indigo-100 active:scale-95"
      >
        Start My Reading
      </button>
    </div>
  );
};
