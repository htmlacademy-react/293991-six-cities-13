import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { AuthorizationStatus, SortType } from '../const';
import { OfferShort } from '../types/offer';

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

export const setError = createAction('SET_ERROR', (error: string | null) => ({
  payload: error
}));
