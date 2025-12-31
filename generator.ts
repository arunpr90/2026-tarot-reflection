
import { MAJOR_ARCANA } from '../constants';
import { FocusArea, ReadingType, TarotCardData, DrawnCard, GeneratedReading } from '../types';

export function drawCards(count: number, includeReversed: boolean): { card: TarotCardData, isReversed: boolean }[] {
  const deck = [...MAJOR_ARCANA];
  const results: { card: TarotCardData, isReversed: boolean }[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * deck.length);
    const card = deck.splice(index, 1)[0];
    const isReversed = includeReversed ? Math.random() > 0.5 : false;
    results.push({ card, isReversed });
  }
  
  return results;
}

export function generateReading(
  card: TarotCardData, 
  isReversed: boolean, 
  focus: FocusArea, 
  context: string,
  positionLabel?: string
): GeneratedReading {
  const keywords = isReversed ? card.keywords_reversed : card.keywords_upright;
  const orientation = isReversed ? "reversed" : "upright";
  const focusLower = focus.toLowerCase() === 'surprise me' ? 'your personal journey' : focus.toLowerCase();
  
  // Basic Logic: Map keywords to structured components
  const theme = `${positionLabel ? `${positionLabel}: ` : ''}With ${card.name} (${orientation}) guiding your ${focusLower}, 2026 focuses on ${keywords[0].toLowerCase()} and ${keywords[1].toLowerCase()}. ${context ? `This directly speaks to your thoughts on "${context}".` : 'Prepare for a year of meaningful shifts.'}`;
  
  const leanInto = [
    `Trust your capacity for ${keywords[0].toLowerCase()} when making decisions.`,
    `Look for opportunities to express ${keywords[2].toLowerCase()} in your daily routine.`
  ];
  
  const watchOut = [
    `Be careful not to let ${isReversed ? 'external pressures' : 'over-excitement'} cloud your judgment.`,
    `Avoid ${keywords[1].toLowerCase()} if it starts to feel forced or misaligned.`
  ];
  
  const action = `In January 2026, take ten minutes to write down how ${keywords[0].toLowerCase()} could change your approach to ${focusLower}.`;

  return { theme, leanInto, watchOut, action };
}
