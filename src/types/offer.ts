import { City } from "./city";
import { Host } from "./host";
import { Location } from "./location";

export type OfferBase = {
  id: string;
  title: string;
  type: string,
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
  images: string[];
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
}
