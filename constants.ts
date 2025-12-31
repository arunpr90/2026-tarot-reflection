// constants.ts (temporary minimal file to unblock build)
// Replace with your real constants if you already had them before.

export const FOCUS_AREAS = [
  "Surprise Me",
  "Career",
  "Money",
  "Health",
  "Relationships",
  "Personal Growth",
] as const;

export type FocusArea = (typeof FOCUS_AREAS)[number];

