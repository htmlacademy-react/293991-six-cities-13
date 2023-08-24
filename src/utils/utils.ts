import { CITIES, FormControlToDisplayError, NEARBY_OFFFERS_COUNT, PARAGRAPH_MAX_LEN, SortType } from '../const';
import { GroupedOffersByCity, OfferBase, OfferDetail, OfferShort } from '../types/offer';
import { City, CityName } from '../types/city';
import { ErrorResponse } from '../types/error-response';

export function convertRatingToWidthPerc(rating: number): string {
  return `${Math.round(rating) / 5 * 100}%`;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function splitLongTextIntoParagraphs(text: string): string[] {
  const sentences: string[] = [];
  let start = 0;
  let groupedSentences: string[] = [];

  if (text.includes('.') || text.includes('?') || text.includes('!')) {
    // Разбить текст на предложения
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '.' || text[i] === '?' || text[i] === '!') {
        const sentence = text.substring(start, i + 1).trim();
        sentences.push(sentence);
        start = i + 1;
      }
    }

    // Склеить предложения в параграфы. Конкатенировать предложения до тех пор пока длина параграфа не более PARAGRAPH_MAX_LEN
    groupedSentences = [];
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
  } else {
    groupedSentences = [text];
  }
  return groupedSentences;
}

export function getRandomKey(): number {
  return Math.round(Math.random() * 1e8);
}

export function groupOffersByCityName<T extends OfferBase>(offers: T[]): GroupedOffersByCity<T> {
  return offers.reduce((accumulator: GroupedOffersByCity<T>, curOffer: T) => {
    const cityExists = curOffer.city.name in accumulator;
    const _offers = cityExists ? [...accumulator[curOffer.city.name], curOffer] : [curOffer];
    return {...accumulator, [curOffer.city.name]: [..._offers]};
  }, {});
}

export function getRandomNearByOffers(offers: OfferShort[], offerDetail: OfferDetail): OfferShort[] {
  if (offers !== undefined && offers !== null && offers.length > 0) {
    if (offers.length > NEARBY_OFFFERS_COUNT) {

      const newOffers: OfferShort[] = [];
      while (newOffers.length < NEARBY_OFFFERS_COUNT) {
        const randomOffer = offers[Math.floor(Math.random() * offers.length)];
        const newOfferExists = newOffers.find((existsOfferShort: OfferShort) => existsOfferShort.id === randomOffer.id || existsOfferShort.id === offerDetail.id);
        if (newOfferExists === undefined || newOfferExists === null) {
          newOffers.push(randomOffer);
        }
      }
      return newOffers;
    } else {
      return offers;
    }
  } else {
    return [];
  }
}

export function getOffersByCity<T extends OfferBase>(offers: T[], cityName: CityName): T[] {
  return groupOffersByCityName<T>(offers)[cityName] || [];
}

export function sortOffers<T extends OfferBase>(offers: T[], sortType: SortType): T[] {
  switch (sortType) {
    case SortType.Popular:
      return [...offers];
    case SortType.Price_low_to_high:
      return [...offers].sort((a: T, b: T) => a.price - b.price);
    case SortType.Price_high_to_low:
      return [...offers].sort((a: T, b: T) => b.price - a.price);
    case SortType.Top_rated_first:
      return [...offers].sort((a: T, b: T) => b.rating - a.rating);
    default:
      return [...offers];
  }
}

export function extractErrorMessageForControl(errorResponse: ErrorResponse | null, control: FormControlToDisplayError): string {
  let errorMessage = '';
  if (errorResponse !== null && errorResponse.details !== undefined) {
    const errorMessages = errorResponse.details.find((item) => item.property === control);
    errorMessage = (errorMessages !== null && errorMessages !== undefined && errorMessages.messages.length > 0) ? errorMessages.messages[0] : '';
  }
  return errorMessage;
}

export function getRandomCity(): City {
  return CITIES[(Math.floor(Math.random() * CITIES.length))];
}

export function getFavoritiesCount(offers: OfferShort[]): number {
  return offers.reduce((accumulator: number, curOffer: OfferShort) => (curOffer.isFavorite ? accumulator + 1 : accumulator), 0);
}

export function getCityDataByCityName(cityName: string): City {
  return CITIES.find((city: City) => city.name === cityName) as City;
}

export function updateOfferFavoriteStatus(offers: OfferShort[], offerId: string, newIsFavorite: boolean): OfferShort[] {
  return offers.map((offer: OfferShort) => ((offer.id === offerId) ? {...offer, isFavorite: newIsFavorite} : offer));
}

export function eraseOfferFavoriteStatus(offers: OfferShort[]): OfferShort[] {
  return offers.map((offer: OfferShort) => ({...offer, isFavorite: false}));
}

export function getOfferById(offers: OfferShort[], offerId: string | null): OfferShort | undefined | null {
  return offerId === null ? null : offers.find((offer: OfferShort) => offer.id === offerId);
}
