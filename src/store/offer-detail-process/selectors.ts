import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Comment } from '../../types/offer-review';
import { OfferDetail, OfferShort } from '../../types/offer';

export const getIsOfferCommentSending = (state: State): boolean => state[NameSpace.OfferDetail].isOfferCommentSending;
export const getIsOfferDetailLoading = (state: State): boolean => state[NameSpace.OfferDetail].isOfferDetailLoading;
export const getOfferComments = (state: State): Comment[] => state[NameSpace.OfferDetail].offerComments;
export const getOfferDetail = (state: State): OfferDetail | null => state[NameSpace.OfferDetail].offerDetail;
export const getOffersNearBy = (state: State): OfferShort[] => state[NameSpace.OfferDetail].offersNearBy;
