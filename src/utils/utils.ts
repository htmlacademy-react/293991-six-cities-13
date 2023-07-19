import { PARAGRAPH_MAX_LEN } from "../const";

export function convertRatingToWidthPerc(rating: number): string {
  return `${rating / 5 * 100}%`
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function splitLongTextIntoParagraphs(text: string): string[] {
  let sentences: string[] = []
  let start: number = 0
  
  // Разбить текст на предложения
  for (let i = 0; i < text.length; i++) {
      if (text[i] === '.' || text[i] === '?' || text[i] === '!') {
          const sentence = text.substring(start, i + 1).trim()
          sentences.push(sentence)
          start = i + 1
      }
  }

  // Склеить предложения в параграфы. Конкатенировать предложения до тех пор пока длина нового предложения не более 
  let groupedSentences: string[] = []
  let newSentence: string = sentences[0]
  for (let i = 1; i < sentences.length; i++) {
        if (newSentence.length <= PARAGRAPH_MAX_LEN) {
          newSentence = [newSentence, sentences[i]].join(' ')
        } else {
          groupedSentences.push(newSentence)
          newSentence = sentences[i]
        }
  }
  if (newSentence.length > 0) {
    groupedSentences.push(newSentence)
  }

  return groupedSentences
}

export function getRandomKey(): number {
  return Math.round(Math.random() * 100000000)
}

export function convertToYYYYMMDD(fullDateTime: string): string {
  const newDT = new Date(fullDateTime)
  return newDT.toISOString().split('T')[0]
}

export function convertToMonthYYYY(fullDateTime: string): string {
  const newDT = new Date(fullDateTime)
  const month = newDT.toLocaleString('default', { month: 'long' });
  return `${month} ${newDT.getFullYear()}`
}