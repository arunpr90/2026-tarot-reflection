
export type FocusArea = 'Career' | 'Money' | 'Love' | 'Health' | 'Learning' | 'Family' | 'Travel' | 'Surprise me';

export type ReadingType = '1' | '3';

export interface TarotCardData {
  name: string;
  keywords_upright: string[];
  keywords_reversed: string[];
  imageId: string; // Keep for fallback or Unsplash use
  filename: string;
  symbol: string;
}

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  positionLabel?: string;
  reading: GeneratedReading;
}

export interface GeneratedReading {
  theme: string;
  leanInto: string[];
  watchOut: string[];
  action: string;
}

export interface AppState {
  view: 'landing' | 'setup' | 'results';
  focusArea: FocusArea;
  readingType: ReadingType;
  userContext: string;
  includeReversed: boolean;
  results: DrawnCard[];
}
