export function countWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/u).length : 0;
}

export function calculateCompression(originalWords: number, answerWords: number): number {
  if (originalWords === 0) return 0;
  return Math.max(0, Math.round((1 - answerWords / originalWords) * 100));
}
