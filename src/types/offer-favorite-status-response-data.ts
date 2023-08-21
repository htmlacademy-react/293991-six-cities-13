import { OfferDetail, OfferShort } from "./offer"

export type OfferFavoriteStatusResponseData = {
  currentOffer: OfferDetail;
  favorites: OfferShort[];
}
