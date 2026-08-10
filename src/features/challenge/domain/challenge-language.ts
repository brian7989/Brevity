export const challengeLanguages = ["en", "ko"] as const;

export type ChallengeLanguage = (typeof challengeLanguages)[number];
