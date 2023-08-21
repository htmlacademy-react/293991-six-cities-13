import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferFavoriteRequest, OfferShort } from '../types/offer';
import { BackendRoute } from '../const';
import { AuthRequestData, AuthResponseData } from '../types/auth-data';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';
import { CommentRequestData } from '../types/comment-request-data';
import { OfferFavoriteStatusResponseData } from '../types/offer-favorite-status-response-data';
import { saveToken } from './token';
import { OfferDetailResponseData } from '../types/offer-detail-response-data';
import { OffersResponseData } from '../types/offers-response-data';

export const fetchOffersAction = createAsyncThunk<OffersResponseData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {extra: api}) => {
    const {data: offers} = await api.get<OfferShort[]>(BackendRoute.Offers);
    const {data: favorites} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    return {offers, favorites}
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferShort[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetch',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    return data
  }
);

export const fetchFavoritesCountAction = createAsyncThunk<number, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetchCount',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    return data.length
  }
);

export const checkAuthAction = createAsyncThunk<AuthResponseData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthResponseData>(BackendRoute.Login);
    saveToken(data.token)
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthResponseData, AuthRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {extra: api}) => {
    const {data: authData} = await api.post<AuthResponseData>(BackendRoute.Login, {email, password});
    saveToken(authData.token)
    const {data: offers} = await api.get<OfferShort[]>(BackendRoute.Offers);
    return {...authData, offers};
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete<AuthResponseData>(BackendRoute.Logout);
  }
);

export const fetchOfferDetailDataAction = createAsyncThunk<OfferDetailResponseData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/fetchDetailData',
  async (offerId, {extra: api}) => {
    const {data: offerDetail} = await api.get<OfferDetail>(generatePath(BackendRoute.OfferDetail, {id: offerId}));
    const {data: offerComments} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
    const {data: offersNearBy} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
    return {offerDetail, offerComments, offersNearBy}
  }
);

export const addCommentAction = createAsyncThunk<Comment, CommentRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/addComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Comment>(generatePath(BackendRoute.Comments, {id: offerId}), {comment, rating});
    return data;
  }
);

export const changeOfferFavoriteStatusAction = createAsyncThunk<OfferFavoriteStatusResponseData, OfferFavoriteRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/sendStatus',
  async ({offerId, offerFavoriteStatus}, {extra: api}) => {
    const {data: currentOffer} = await api.post<OfferDetail>(generatePath(BackendRoute.FavoriteStatus, {id: offerId, status: `${offerFavoriteStatus}`}));
    const {data: favorites} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    return {currentOffer, favorites};
  }
);
