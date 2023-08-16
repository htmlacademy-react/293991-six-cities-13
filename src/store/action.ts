import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { AppRoute, AuthorizationStatus, SortType } from '../const';
import { OfferDetail, OfferShort } from '../types/offer';
import { Comment } from '../types/offer-review';
import { ErrorResponse } from '../types/error-response';
import { differenceInSeconds } from 'date-fns';

export const changeCity = createAction('CHANGE_CITY', (clickedCity: City) => ({
  payload: clickedCity
}));

export const loadOffers = createAction('LOAD_OFFERS', (offers: OfferShort[]) => ({
  payload: offers
}));

export const changeSortType = createAction('CHANGE_SORT_TYPE', (sortType: SortType) => ({
  payload: sortType
}));

export const changeOffersLoadingStatus = createAction('CHANGE_OFFERS_LOADING_STATUS', (isOffersLoading: boolean) => ({
  payload: isOffersLoading
}));

export const requireAuthorization = createAction('REQUIRE_AUTHORIZATION', (authorizationStatus: AuthorizationStatus) => ({
  payload: authorizationStatus
}));

export const redirectToRoute = createAction<AppRoute>('REDIRECT_TO_ROUTE');

export const changeUserEmail = createAction('CHANGE_USER_EMAIL', (userEmail: string) => ({
  payload: userEmail
}));

export const loadOfferDetail = createAction('LOAD_OFFER_DETAIL', (offerDetail: OfferDetail) => ({
  payload: offerDetail
}));

export const changeOfferDetailLoadingStatus = createAction('CHANGE_OFFER_DETAIL_LOADING_STATUS', (isOfferDetailLoading: boolean) => ({
  payload: isOfferDetailLoading
}));

export const deleteOfferDetail = createAction('DELETE_OFFER_DETAIL');

export const loadOfferComments = createAction('LOAD_OFFER_COMMENTS', (offerComments: Comment[]) => ({
  payload: [...offerComments].sort((a: Comment, b: Comment) => differenceInSeconds(new Date(b.date), new Date(a.date)))
}));

export const changeOfferCommentsLoadingStatus = createAction('CHANGE_OFFER_COMMENTS_LOADING_STATUS', (areOfferCommentsLoading: boolean) => ({
  payload: areOfferCommentsLoading
}));

export const changeOfferCommentSendingStatus = createAction('CHANGE_OFFER_COMMENT_SENDING_STATUS', (isOfferCommentSending: boolean) => ({
  payload: isOfferCommentSending
}));

export const deleteOfferComments = createAction('DELETE_OFFER_COMMENTS');

export const loadOffersNearBy = createAction('LOAD_OFFERS_NEARBY', (offers: OfferShort[]) => ({
  payload: offers
}));

export const changeOffersNearByLoadingStatus = createAction('CHANGE_OFFERS_NEARBY_LOADING_STATUS', (areOffersNearByLoading: boolean) => ({
  payload: areOffersNearByLoading
}));

export const deleteOffersNearBy = createAction('DELETE_OFFERS_NEARBY');

export const setError = createAction('SET_ERROR', (errorResponse: ErrorResponse | null) => ({
  payload: errorResponse
}));

export const changeOfferFavoriteStatus = createAction('CHANGE_OFFER_FAVORITE_STATUS', (offer: OfferDetail) => ({
  payload: offer
}));

export const changeFavoritesLoadingStatus = createAction('CHANGE_FAVORITES_LOADING_STATUS', (areFavoritesLoading: boolean) => ({
  payload: areFavoritesLoading
}));

export const loadFavorites = createAction('LOAD_FAVORITIES', (offers: OfferShort[]) => ({
  payload: offers
}));

export const deleteFavorites = createAction('DELETE_FAVORITES');

export const deleteFavorite = createAction('DELETE_FAVORITE', (offerId: string) => ({
  payload: offerId
}));

// export const 
