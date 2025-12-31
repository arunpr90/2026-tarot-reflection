
import React, { useState, useCallback } from 'react';
import Layout from "./Layout";
import Landing from "./Landing";
import Results from "./Results";
import Setup from "./Setup";
import { AppState, FocusArea, ReadingType, DrawnCard } from './types';
import { drawCards, generateReading } from './utils/generator';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'landing',
    focusArea: 'Surprise me',
    readingType: '1',
    userContext: '',
    includeReversed: false,
    results: []
  });

  const handleStart = () => {
    setState(prev => ({ ...prev, view: 'setup' }));
  };

  const handleDraw = useCallback(() => {
    const count = state.readingType === '1' ? 1 : 3;
    const drawn = drawCards(count, state.includeReversed);
    
    const labels = state.readingType === '3' ? ['Early 2026', 'Mid 2026', 'Late 2026'] : [undefined];
    
    const newResults: DrawnCard[] = drawn.map((d, i) => ({
      card: d.card,
      isReversed: d.isReversed,
      positionLabel: labels[i],
      reading: generateReading(d.card, d.isReversed, state.focusArea, state.userContext, labels[i])
    }));

    setState(prev => ({ ...prev, results: newResults, view: 'results' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.readingType, state.includeReversed, state.focusArea, state.userContext]);

  const setFocus = (focusArea: FocusArea) => setState(prev => ({ ...prev, focusArea }));
  const setType = (readingType: ReadingType) => setState(prev => ({ ...prev, readingType }));
  const setContext = (userContext: string) => setState(prev => ({ ...prev, userContext }));
  const setReversed = (includeReversed: boolean) => setState(prev => ({ ...prev, includeReversed }));

  const changeSetup = () => {
    setState(prev => ({ ...prev, view: 'setup' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {state.view === 'landing' && (
        <Landing onStart={handleStart} />
      )}
      
      {state.view === 'setup' && (
        <Setup 
          focus={state.focusArea}
          setFocus={setFocus}
          type={state.readingType}
          setType={setType}
          context={state.userContext}
          setContext={setContext}
          reversed={state.includeReversed}
          setReversed={setReversed}
          onDraw={handleDraw}
        />
      )}

      {state.view === 'results' && (
        <Results 
          cards={state.results}
          focus={state.focusArea}
          type={state.readingType}
          onDrawAgain={handleDraw}
          onChangeSetup={changeSetup}
        />
      )}
    </Layout>
  );
};

export default App;
