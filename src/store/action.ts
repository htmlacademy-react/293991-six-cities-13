import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { AppRoute, AuthorizationStatus, SortType } from '../const';
import { OfferDetail, OfferShort } from '../types/offer';
import { Comment } from '../types/offer-review';
import { ErrorResponse } from '../types/error-response';
import { differenceInSeconds } from 'date-fns';

export const changeCity = createAction('city/change', (clickedCity: City) => ({
  payload: clickedCity
}));

export const loadOffers = createAction('offers/save', (offers: OfferShort[]) => ({
  payload: offers
}));

export const changeSortType = createAction('sortType/change', (sortType: SortType) => ({
  payload: sortType
}));

export const changeOffersLoadingStatus = createAction('offers/changeLoadingStatus', (isOffersLoading: boolean) => ({
  payload: isOffersLoading
}));

export const saveAuthorization = createAction('auth/save', (authorizationStatus: AuthorizationStatus) => ({
  payload: authorizationStatus
}));

export const redirectToRoute = createAction<AppRoute>('route/redirect');

export const changeUserEmail = createAction('user/changeEmail', (userEmail: string) => ({
  payload: userEmail
}));

export const saveOfferDetail = createAction('offer/save', (offerDetail: OfferDetail) => ({
  payload: offerDetail
}));

export const changeOfferDetailLoadingStatus = createAction('offer/changeLoadingStatus', (isOfferDetailLoading: boolean) => ({
  payload: isOfferDetailLoading
}));

export const deleteOfferDetail = createAction('offer/delete');

export const saveOfferComments = createAction('offer/saveComments', (offerComments: Comment[]) => ({
  payload: [...offerComments].sort((a: Comment, b: Comment) => differenceInSeconds(new Date(b.date), new Date(a.date)))
}));

export const changeOfferCommentSendingStatus = createAction('offer/changeCommentSendingStatus', (isOfferCommentSending: boolean) => ({
  payload: isOfferCommentSending
}));

export const deleteOfferComments = createAction('offer/DeleteComments');

export const saveOffersNearBy = createAction('offer/saveNearBy', (offers: OfferShort[]) => ({
  payload: offers
}));

export const changeOffersNearByLoadingStatus = createAction('offer/changeNearByLoadingStatus', (areOffersNearByLoading: boolean) => ({
  payload: areOffersNearByLoading
}));

export const deleteOffersNearBy = createAction('offer/deleteNearBy');

export const setError = createAction('error/set', (errorResponse: ErrorResponse | null) => ({
  payload: errorResponse
}));

export const changeOfferFavoriteStatus = createAction('offer/changeFavoriteStatus', (offer: OfferDetail) => ({
  payload: offer
}));

export const changeFavoritesLoadingStatus = createAction('favorites/changeLoadingStatus', (areFavoritesLoading: boolean) => ({
  payload: areFavoritesLoading
}));

export const saveFavorites = createAction('favorites/save', (offers: OfferShort[]) => ({
  payload: offers
}));

export const deleteFavorites = createAction('favorites/deleteAll');

export const deleteFavorite = createAction('favorites/deleteSingle', (offerId: string) => ({
  payload: offerId
}));

export const eraseFavoritesAfterLogout = createAction('favorites/eraseAfterLogout');

export const setHoveredOffer = createAction('hoveredOffer/set', (offer: OfferShort | null) => ({
  payload: offer
}));
