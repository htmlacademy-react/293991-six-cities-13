import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { AppRoute, AuthorizationStatus, MAX_COMMENTS_IN_REVIEW, SortType } from '../const';
import { OfferDetail, OfferShort } from '../types/offer';
import { Comment } from '../types/offer-review';
import { ErrorResponse } from '../types/error-response';

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
  payload: offerComments
}));

export const changeOfferCommentsLoadingStatus = createAction('CHANGE_OFFER_COMMENTS_LOADING_STATUS', (areOfferCommentsLoading: boolean) => ({
  payload: areOfferCommentsLoading
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
