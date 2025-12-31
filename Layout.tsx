
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16 max-w-4xl mx-auto">
      {children}
      <footer className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-[0.2em] pb-8 leading-loose">
        Reflecting on 2026 &bull; Tarot Wisdom <br/> 
        powered by artificial and Arun Intelligence
      </footer>
    </div>
  );
};
