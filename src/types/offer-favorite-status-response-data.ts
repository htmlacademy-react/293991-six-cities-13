import { OfferDetail, OfferShort } from './offer';

export type OfferFavoriteStatusResponseData = {
  currentOffer: OfferDetail | null;
  favorites: OfferShort[];
}
