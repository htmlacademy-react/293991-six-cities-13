import { City } from './city';
import { Person } from './person';
import { Location } from './location';

export type OfferBase = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
}

export type OfferShort = OfferBase & {
  previewImage: string;
}

export type OfferDetail = OfferBase & {
  description: string;
  images: string[];
  goods: string[];
  host: Person;
  bedrooms: number;
  maxAdults: number;
}

export type GroupedOffersByCity<T> = {
  [cityName: string]: T[];
}
