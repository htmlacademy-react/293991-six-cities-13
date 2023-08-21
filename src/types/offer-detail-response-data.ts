import { OfferDetail, OfferShort } from "./offer"
import { Comment } from '../types/offer-review';

export type OfferDetailResponseData = {
  offerDetail: OfferDetail,
  offerComments: Comment[],
  offersNearBy: OfferShort[],
}
