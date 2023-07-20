import { TCity } from './city';
import { TPerson } from './person';
import { TLocation } from './location';

export type TOfferBase = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
}

export type TOfferShort = TOfferBase & {
  previewImage: string;
}

export type TOfferDetail = TOfferBase & {
  description: string;
  images: string[];
  goods: string[];
  host: TPerson;
  bedrooms: number;
  maxAdults: number;
}
