import { PARAGRAPH_MAX_LEN } from '../const';
import { offersShort } from '../mocks/offers-short';
import { GroupedOffersByCity, OfferBase, OfferShort } from '../types/offer';
import { CityName } from '../types/city';
import { GroupedOffersByCity, OfferBase } from '../types/offer';

export function convertRatingToWidthPerc(rating: number): string {
  return `${rating / 5 * 100}%`;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function splitLongTextIntoParagraphs(text: string): string[] {
  const sentences: string[] = [];
  let start = 0;

  // Разбить текст на предложения
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '.' || text[i] === '?' || text[i] === '!') {
      const sentence = text.substring(start, i + 1).trim();
      sentences.push(sentence);
      start = i + 1;
    }
  }

  // Склеить предложения в параграфы. Конкатенировать предложения до тех пор пока длина параграфа не более PARAGRAPH_MAX_LEN
  const groupedSentences: string[] = [];
  let newSentence: string = sentences[0];
  for (let i = 1; i < sentences.length; i++) {
    if (newSentence.length <= PARAGRAPH_MAX_LEN) {
      newSentence = [newSentence, sentences[i]].join(' ');
    } else {
      groupedSentences.push(newSentence);
      newSentence = sentences[i];
    }
  }
  if (newSentence.length > 0) {
    groupedSentences.push(newSentence);
  }

  return groupedSentences;
}

export function getRandomKey(): number {
  return Math.round(Math.random() * 1e8);
}

export function groupOffersByCity<T extends OfferBase>(offers: T[]): GroupedOffersByCity<T> {
  return offers.reduce((accumulator: GroupedOffersByCity<T>, curOffer: T) => {
    const cityExists = curOffer.city.name in accumulator;
    const _offers = cityExists ? [...accumulator[curOffer.city.name], curOffer] : [curOffer];
    return {...accumulator, [curOffer.city.name]: [..._offers]};
  }, {});
}

export function getNearOffers(): OfferShort[] {
  return offersShort.slice(0, 3);
}

export function getOffersByCity<T extends OfferBase>(offers: T[], cityName: CityName): T[] {
  return groupOffersByCity<T>(offers)[cityName] || [];
}
