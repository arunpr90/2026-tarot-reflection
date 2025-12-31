// constants.ts

import { TarotCardData } from "./types";

/**
 * Major Arcana tarot cards (22)
 * Minimal but valid data to satisfy generator logic
 */
export const MAJOR_ARCANA: TarotCardData[] = [
  {
    name: "The Fool",
    keywords_upright: ["Beginnings", "Freedom", "Leap of faith"],
    keywords_reversed: ["Recklessness", "Naivety", "Delay"],
  },
  {
    name: "The Magician",
    keywords_upright: ["Manifestation", "Skill", "Action"],
    keywords_reversed: ["Manipulation", "Untapped potential"],
  },
  {
    name: "The High Priestess",
    keywords_upright: ["Intuition", "Inner voice", "Wisdom"],
    keywords_reversed: ["Hidden motives", "Ignoring intuition"],
  },
  {
    name: "The Empress",
    keywords_upright: ["Growth", "Care", "Abundance"],
    keywords_reversed: ["Dependence", "Creative block"],
  },
  {
    name: "The Emperor",
    keywords_upright: ["Structure", "Authority", "Stability"],
    keywords_reversed: ["Rigidity", "Control issues"],
  },
  {
    name: "The Hierophant",
    keywords_upright: ["Tradition", "Learning", "Guidance"],
    keywords_reversed: ["Rebellion", "Breaking norms"],
  },
  {
    name: "The Lovers",
    keywords_upright: ["Connection", "Choice", "Alignment"],
    keywords_reversed: ["Imbalance", "Disharmony"],
  },
  {
    name: "The Chariot",
    keywords_upright: ["Momentum", "Willpower", "Victory"],
    keywords_reversed: ["Lack of direction", "Resistance"],
  },
  {
    name: "Strength",
    keywords_upright: ["Courage", "Patience", "Inner power"],
    keywords_reversed: ["Self-doubt", "Burnout"],
  },
  {
    name: "The Hermit",
    keywords_upright: ["Reflection", "Clarity", "Insight"],
    keywords_reversed: ["Isolation", "Avoidance"],
  },
  {
    name: "Wheel of Fortune",
    keywords_upright: ["Change", "Timing", "Luck"],
    keywords_reversed: ["Delays", "Setbacks"],
  },
  {
    name: "Justice",
    keywords_upright: ["Fairness", "Truth", "Accountability"],
    keywords_reversed: ["Bias", "Avoiding responsibility"],
  },
  {
    name: "The Hanged Man",
    keywords_upright: ["New perspective", "Pause", "Acceptance"],
    keywords_reversed: ["Stagnation", "Resistance"],
  },
  {
    name: "Death",
    keywords_upright: ["Transformation", "Endings", "Renewal"],
    keywords_reversed: ["Fear of change", "Clinging"],
  },
  {
    name: "Temperance",
    keywords_upright: ["Balance", "Patience", "Flow"],
    keywords_reversed: ["Extremes", "Imbalance"],
  },
  {
    name: "The Devil",
    keywords_upright: ["Attachment", "Material focus"],
    keywords_reversed: ["Release", "Breaking free"],
  },
  {
    name: "The Tower",
    keywords_upright: ["Sudden change", "Truth revealed"],
    keywords_reversed: ["Avoided disaster", "Delayed change"],
  },
  {
    name: "The Star",
    keywords_upright: ["Hope", "Healing", "Optimism"],
    keywords_reversed: ["Doubt", "Loss of faith"],
  },
  {
    name: "The Moon",
    keywords_upright: ["Uncertainty", "Subconscious"],
    keywords_reversed: ["Clarity", "Truth surfaces"],
  },
  {
    name: "The Sun",
    keywords_upright: ["Joy", "Success", "Vitality"],
    keywords_reversed: ["Overconfidence", "Temporary dip"],
  },
  {
    name: "Judgement",
    keywords_upright: ["Awakening", "Decision", "Calling"],
    keywords_reversed: ["Self-doubt", "Avoidance"],
  },
  {
    name: "The World",
    keywords_upright: ["Completion", "Wholeness", "Achievement"],
    keywords_reversed: ["Loose ends", "Delay"],
  },
];
