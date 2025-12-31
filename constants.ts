// constants.ts
import { TarotCardData } from "./types";

/**
 * Focus areas shown in Setup screen
 */
export const FOCUS_AREAS = [
  "Career",
  "Money",
  "Health",
  "Relationships",
  "Personal Growth",
  "Family",
  "Travel",
] as const;

/**
 * Major Arcana tarot cards (22)
 * Minimal but complete dataset to satisfy generator + UI
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
    keywords_upright: ["Intuition", "Inner wisdom"],
    keywords_reversed: ["Ignoring intuition", "Secrets"],
  },
  {
    name: "The Empress",
    keywords_upright: ["Growth", "Abundance", "Care"],
    keywords_reversed: ["Creative block", "Dependence"],
  },
  {
    name: "The Emperor",
    keywords_upright: ["Structure", "Authority", "Stability"],
    keywords_reversed: ["Rigidity", "Control issues"],
  },
  {
    name: "The Hierophant",
    keywords_upright: ["Tradition", "Guidance", "Learning"],
    keywords_reversed: ["Rebellion", "Breaking norms"],
  },
  {
    name: "The Lovers",
    keywords_upright: ["Alignment", "Choice", "Connection"],
    keywords_reversed: ["Imbalance", "Disharmony"],
  },
  {
    name: "The Chariot",
    keywords_upright: ["Willpower", "Momentum", "Victory"],
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
    keywords_upright: ["Truth", "Fairness", "Accountability"],
    keywords_reversed: ["Bias", "Avoidance"],
  },
  {
    name: "The Hanged Man",
    keywords_upright: ["New perspective", "Pause"],
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
    keywords_reversed: ["Delayed change", "Avoidance"],
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
    keywords_reversed: ["Temporary dip", "Overconfidence"],
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
