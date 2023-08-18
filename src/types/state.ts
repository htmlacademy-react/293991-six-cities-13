import { store } from '../store';
import {AuthorizationStatus, SortType} from '../const';
import { ErrorResponse } from './error-response';
import { City } from './city';
import { OfferDetail, OfferShort } from './offer';
import { Comment } from './offer-review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
};

export type OffersProcess = {
  activeCity: City;
  offers: OfferShort[];
  offersByCity: OfferShort[];
  sortType: SortType;
  areOffersLoading: boolean;
};

export type FavoriteProcess = {
  favoritesCount: number;
  favorites: OfferShort[];
  areFavoritesLoading: boolean;
};

export type OfferDetailProcess = {
  offerDetail: OfferDetail | null;
  isOfferDetailLoading: boolean;
  offerComments: Comment[];
  isOfferCommentSending: boolean;
  offersNearBy: OfferShort[];
};

export type ResponseError = {
  errorResponse: ErrorResponse | null;
};

export type HoveredOffer = {
  hoveredOffer: OfferShort | null | undefined;
};
