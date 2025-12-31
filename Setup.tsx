
import React from 'react';
import { FOCUS_AREAS } from '../constants';
import { FocusArea, ReadingType } from '../types';

interface SetupProps {
  focus: FocusArea;
  setFocus: (f: FocusArea) => void;
  type: ReadingType;
  setType: (t: ReadingType) => void;
  context: string;
  setContext: (c: string) => void;
  reversed: boolean;
  setReversed: (r: boolean) => void;
  onDraw: () => void;
}

export const Setup: React.FC<SetupProps> = ({ 
  focus, setFocus, type, setType, context, setContext, reversed, setReversed, onDraw 
}) => {
  return (
    <div className="w-full max-w-lg space-y-10 animate-fade-in">
      <header className="text-center space-y-2">
        <h2 className="serif text-3xl font-bold text-slate-800">Prepare your reflection</h2>
        <p className="text-slate-500">Set your intentions for 2026</p>
      </header>

      {/* Focus Area */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Focus Area</label>
        <div className="flex flex-wrap gap-2">
          {FOCUS_AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setFocus(area as FocusArea)}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${
                focus === area 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Type */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Spread Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setType('1')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              type === '1' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 mb-2 ${type === '1' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`} />
            <div className="font-bold text-slate-800">1 Card</div>
            <div className="text-xs text-slate-500">Quick Year Theme</div>
          </button>
          <button
            onClick={() => setType('3')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              type === '3' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 mb-2 ${type === '3' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`} />
            <div className="font-bold text-slate-800">3 Cards</div>
            <div className="text-xs text-slate-500">Early, Mid, Late 2026</div>
          </button>
        </div>
      </div>

      {/* Context Input */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">What's on your mind? (Optional)</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value.slice(0, 200))}
          placeholder="e.g. Planning a big move or seeking more peace..."
          className="w-full p-4 border border-slate-200 rounded-2xl outline-none transition-all resize-none h-24 block
                     text-slate-800 bg-white caret-indigo-600 placeholder:text-slate-400 
                     focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
        />
        <div className="text-right text-xs text-slate-400 font-medium">{context.length}/200</div>
      </div>

      {/* Reversed Toggle */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div>
          <div className="font-semibold text-slate-700">Include reversed cards</div>
          <div className="text-xs text-slate-500">Add complexity with inverted meanings</div>
        </div>
        <button 
          onClick={() => setReversed(!reversed)}
          className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-indigo-200 ${reversed ? 'bg-indigo-600' : 'bg-slate-300'}`}
          aria-pressed={reversed}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${reversed ? 'left-7' : 'left-1'}`} />
        </button>
      </div>

      <button
        onClick={onDraw}
        className="w-full py-5 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 focus:ring-4 focus:ring-indigo-200"
      >
        Draw Cards
      </button>
    </div>
  );
};
