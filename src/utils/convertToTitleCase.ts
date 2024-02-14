export function convertToTitleCase(sentence: string): string {
  return sentence.replace(/_/g, ' ').replace(/\b\w/g, match => match.toUpperCase());
}
