
import React, { useState, useRef } from 'react';
import { DrawnCard, FocusArea, ReadingType, TarotCardData } from '../types';
import { toPng } from 'html-to-image';

interface ResultsProps {
  cards: DrawnCard[];
  focus: FocusArea;
  type: ReadingType;
  onDrawAgain: () => void;
  onChangeSetup: () => void;
}

type ExportFormat = 'post' | 'story';

export const Results: React.FC<ResultsProps> = ({ cards, focus, type, onDrawAgain, onChangeSetup }) => {
  const [sharingIdx, setSharingIdx] = useState<number | null>(null);
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('post');
  const exportRef = useRef<HTMLDivElement>(null);

  const truncate = (str: string, max: number) => {
    if (str.length <= max) return str;
    return str.slice(0, max - 3).trim() + '...';
  };

  const handleCopyText = () => {
    const text = cards.map(c => `
${c.positionLabel || 'Reflection'}: ${c.card.name} (${c.isReversed ? 'Reversed' : 'Upright'})
Theme: ${c.reading.theme}
Jan 2026 Action: ${c.reading.action}
    `).join('\n---\n');
    
    navigator.clipboard.writeText(`My 2026 Tarot Reflection (${focus}):\n${text}`);
    alert('Reading copied to clipboard!');
  };

  const handleDownload = async (index: number, format: ExportFormat) => {
    if (sharingIdx !== null) return;
    
    setActiveFormat(format);
    setSharingIdx(index);
    
    // Increased timeout to ensure React renders the hidden template even on slower devices
    await new Promise(r => setTimeout(r, 600));

    if (!exportRef.current) {
      console.error('Export reference not found');
      setSharingIdx(null);
      return;
    }

    try {
      await document.fonts.ready;
      const images = Array.from(exportRef.current.querySelectorAll('img'));
      
      // Wait for all images in the hidden template to be ready
      await Promise.all(images.map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even on error to prevent hanging
        });
      }));

      const width = 1080;
      const height = format === 'post' ? 1080 : 1920;

      // Capture the PNG
      const dataUrl = await toPng(exportRef.current, {
        canvasWidth: width,
        canvasHeight: height,
        width: width,
        height: height,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#fdfcfb', // Ensure background is opaque
      });

      const link = document.createElement('a');
      const cardName = cards[index].card.name.toLowerCase().replace(/\s/g, '-');
      link.download = `tarot-2026-${cardName}-${format}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Download failed. This can happen on some mobile browsers. Copying reading text as fallback.');
      handleCopyText();
    } finally {
      setSharingIdx(null);
    }
  };

  const getCardImageUrl = (card: TarotCardData) => `/assets/cards/${card.filename}`;
  const fallbackUrl = (card: TarotCardData) => `https://images.unsplash.com/photo-${card.imageId}?auto=format&fit=crop&q=80&w=600&h=900`;

  return (
    <div className="w-full space-y-12 animate-fade-in pb-20 px-2 relative">
      <header className="text-center space-y-3">
        <div className="text-sm font-semibold text-indigo-500 uppercase tracking-widest bg-indigo-50 inline-block px-3 py-1 rounded-full">Your 2026 Insight</div>
        <h2 className="serif text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">{focus}</h2>
        <p className="text-slate-500 italic max-w-md mx-auto">{type === '1' ? 'A singular theme for your year ahead.' : 'A progression through the seasons of 2026.'}</p>
      </header>

      <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
        {cards.map((drawn, idx) => {
          const [imgLoaded, setImgLoaded] = useState(false);

          return (
            <div 
              key={idx} 
              className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8 overflow-hidden animate-reveal"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Main Card UI */}
                <div className="w-full md:w-[280px] shrink-0 space-y-4">
                  <div className="relative group">
                    {drawn.positionLabel && (
                      <div className="absolute -top-3 -left-3 px-4 py-2 bg-indigo-600 shadow-lg shadow-indigo-200 rounded-xl text-xs uppercase font-bold text-white tracking-wider z-30">
                        {drawn.positionLabel}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md z-30 border border-indigo-100">
                      {drawn.card.symbol}
                    </div>
                    {drawn.isReversed && (
                      <div className="absolute bottom-4 left-4 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-md z-30 animate-bounce-subtle">
                        Reversed
                      </div>
                    )}
                    <div className="aspect-[2.5/4.5] bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white relative flex items-center justify-center">
                      <img 
                        src={getCardImageUrl(drawn.card)} 
                        alt={`Tarot card: ${drawn.card.name}`}
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-300 ease-in-out ${drawn.isReversed ? 'rotate-180 scale-105' : 'scale-100'} ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onError={(e) => {
                          if (e.currentTarget.src !== fallbackUrl(drawn.card)) {
                             e.currentTarget.src = fallbackUrl(drawn.card);
                          }
                        }}
                      />
                      {!imgLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 serif text-8xl select-none">{drawn.card.name.charAt(0)}</div>
                      )}
                      <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/60 to-transparent">
                        <span className="text-white font-bold tracking-widest uppercase text-[10px] drop-shadow-md">{drawn.card.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-left pt-2">
                    <h3 className="serif text-3xl font-bold text-slate-800">{drawn.card.name}</h3>
                    <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mt-1">
                      {drawn.isReversed ? 'The Inverted Path' : 'The Upright Wisdom'}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-8 w-full">
                  <div className="space-y-6">
                    <section>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full" />
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Yearly Theme</h4>
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed font-light italic">"{drawn.reading.theme}"</p>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                        <h4 className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-widest">Lean Into</h4>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {drawn.reading.leanInto.map((l, i) => <li key={i}>• {l}</li>)}
                        </ul>
                      </div>
                      <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                        <h4 className="text-[10px] font-bold text-amber-600 uppercase mb-2 tracking-widest">Watch Out</h4>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {drawn.reading.watchOut.map((w, i) => <li key={i}>• {w}</li>)}
                        </ul>
                      </div>
                    </div>
                    <section className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                      <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2 relative z-10">Starting Ritual: January 2026</h4>
                      <p className="text-base font-medium leading-relaxed relative z-10">"{drawn.reading.action}"</p>
                    </section>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button 
                        onClick={() => handleDownload(idx, 'post')}
                        disabled={sharingIdx !== null}
                        className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white text-xs font-bold rounded-2xl hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-md shadow-indigo-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4-4v12"/></svg>
                        {sharingIdx === idx && activeFormat === 'post' ? 'Processing...' : 'Download Post (1:1)'}
                      </button>
                      <button 
                        onClick={() => handleDownload(idx, 'story')}
                        disabled={sharingIdx !== null}
                        className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl hover:bg-black transition-colors disabled:opacity-50 shadow-md shadow-slate-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4-4m4-4v12"/></svg>
                        {sharingIdx === idx && activeFormat === 'story' ? 'Processing...' : 'Download Story (9:16)'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* HIDDEN EXPORT TEMPLATE */}
      <div className="fixed top-[-9999px] left-[-9999px] overflow-hidden pointer-events-none">
        {sharingIdx !== null && (
          <div 
            ref={exportRef} 
            className="bg-[#fdfcfb] flex flex-col items-center relative box-border" 
            style={{ 
              width: 1080, 
              height: activeFormat === 'post' ? 1080 : 1920,
              padding: activeFormat === 'post' ? '60px' : '100px 60px' 
            }}
          >
            {/* Header */}
            <div className={`text-center w-full ${activeFormat === 'post' ? 'mb-4' : 'mb-12'}`}>
              <span className={`text-indigo-600 font-bold uppercase tracking-[0.3em] ${activeFormat === 'post' ? 'text-sm' : 'text-lg'}`}>
                2026 Tarot Reflection
              </span>
              <h2 className={`serif font-bold text-slate-800 mt-2 capitalize ${activeFormat === 'post' ? 'text-4xl' : 'text-7xl'}`}>
                {focus}
              </h2>
            </div>

            {/* Layout - Post (Square) */}
            {activeFormat === 'post' && (
              <div className="flex-1 w-full flex flex-col items-center justify-between">
                <div className="relative">
                  <div className="absolute top-4 right-4 bg-white/95 w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xl z-30 border border-indigo-100">
                    {cards[sharingIdx].card.symbol}
                  </div>
                  <div className="aspect-[2.5/4.5] h-[520px] bg-indigo-900 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] relative">
                    <img 
                      crossOrigin="anonymous"
                      src={getCardImageUrl(cards[sharingIdx].card)} 
                      className={`w-full h-full object-cover ${cards[sharingIdx].isReversed ? 'rotate-180' : ''}`}
                      onError={(e) => {
                        if (e.currentTarget.src !== fallbackUrl(cards[sharingIdx].card)) {
                           e.currentTarget.src = fallbackUrl(cards[sharingIdx].card);
                        }
                      }}
                    />
                    <div className="absolute bottom-0 w-full p-4 text-center bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-white font-bold tracking-[0.3em] uppercase text-sm">{cards[sharingIdx].card.name}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full max-w-2xl text-center space-y-6 mb-4">
                  <div className="space-y-2">
                    <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Yearly Theme</h4>
                    <p className="serif text-2xl text-slate-700 italic leading-snug px-8">
                      "{truncate(cards[sharingIdx].reading.theme.split(': ').pop() || '', 140)}"
                    </p>
                  </div>

                  <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl mx-12">
                    <h4 className="text-indigo-200 font-bold uppercase tracking-widest text-[10px] mb-2">January 2026 Ritual</h4>
                    <p className="text-lg font-medium leading-tight">
                      {truncate(cards[sharingIdx].reading.action, 120)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Layout - Story (9:16) */}
            {activeFormat === 'story' && (
              <div className="flex-1 w-full flex flex-col items-center">
                <div className="relative mb-16">
                  <div className="absolute top-6 right-6 bg-white/95 w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-2xl z-30 border border-indigo-100">
                    {cards[sharingIdx].card.symbol}
                  </div>
                  {cards[sharingIdx].positionLabel && (
                    <div className="absolute -top-6 -left-6 px-10 py-4 bg-indigo-600 rounded-3xl text-2xl uppercase font-bold text-white tracking-[0.2em] z-30 shadow-2xl">
                      {cards[sharingIdx].positionLabel}
                    </div>
                  )}
                  <div className="aspect-[2.5/4.5] h-[850px] bg-indigo-900 rounded-[4rem] overflow-hidden border-[12px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative">
                    <img 
                      crossOrigin="anonymous"
                      src={getCardImageUrl(cards[sharingIdx].card)} 
                      className={`w-full h-full object-cover ${cards[sharingIdx].isReversed ? 'rotate-180' : ''}`}
                      onError={(e) => {
                        if (e.currentTarget.src !== fallbackUrl(cards[sharingIdx].card)) {
                           e.currentTarget.src = fallbackUrl(cards[sharingIdx].card);
                        }
                      }}
                    />
                    <div className="absolute bottom-0 w-full p-10 text-center bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-white font-bold tracking-[0.4em] uppercase text-2xl">{cards[sharingIdx].card.name}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-12 px-10 text-center flex-1">
                  <div className="space-y-4">
                    <h4 className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-xl">The Theme</h4>
                    <p className="serif text-5xl text-slate-700 italic leading-[1.3] px-2">
                      "{cards[sharingIdx].reading.theme.split(': ').pop()}"
                    </p>
                  </div>

                  <div className="bg-indigo-600 text-white p-12 rounded-[3.5rem] shadow-2xl">
                    <h4 className="text-indigo-200 font-bold uppercase tracking-[0.2em] text-sm mb-6">Starting Ritual: January 2026</h4>
                    <p className="text-4xl font-medium leading-tight italic">
                      {cards[sharingIdx].reading.action}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className={`w-full text-center ${activeFormat === 'post' ? 'mt-4' : 'mt-10'}`}>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] mb-2">Reflect on 2026 &bull; For reflection only</p>
              <div className="h-1 w-24 bg-indigo-100 mx-auto rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Main UI Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
        <button onClick={onDrawAgain} className="group relative px-10 py-4 bg-indigo-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-200">
          <span className="relative z-10">Draw New Year</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button onClick={onChangeSetup} className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-full hover:bg-slate-50 hover:border-indigo-100 transition-all">
          Change Focus
        </button>
        <button onClick={handleCopyText} className="px-10 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg">
          Copy Reading
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed border-t border-slate-100 pt-8">
        Reflect on these insights with an open mind. 2026 is yours to shape. 
        <br/>For entertainment and self-reflection purposes only.
      </p>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
