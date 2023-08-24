import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferFavoriteRequest, OfferShort } from '../types/offer';
import { AppRoute, AuthorizationStatus, BackendRoute, EMPTY_AUTH_USER_RESPONSE, EMPTY_COMMENT_RESPONSE, EMPTY_FAVORITES_RESPONSE, EMPTY_OFFERS_RESPONSE, EMPTY_OFFER_DETAIL_RESPONSE, EMPTY_OFFER_FAVORITE_STATUS_RESPONSE } from '../const';
import { AuthRequestData, AuthUser } from '../types/auth-data';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';
import { CommentRequestData } from '../types/comment-request-data';
import { OfferFavoriteStatusResponseData } from '../types/offer-favorite-status-response-data';
import { saveToken } from './token';
import { OfferDetailResponseData } from '../types/offer-detail-response-data';
import { redirectToRoute } from '../store/action';
import { setAuthData } from '../store/user-process/user-process';
import { setOffers, setOffersLoadingStatus } from '../store/offers-process/offers-process';
import { setFavorites } from '../store/favorite-process/favorite-process';

export const fetchOffersAction = createAsyncThunk<OfferShort[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<OfferShort[]>(BackendRoute.Offers);
      return data;
    } catch {
      return EMPTY_OFFERS_RESPONSE;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferShort[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetch',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<OfferShort[]>(BackendRoute.Favorite);
      return data;
    } catch {
      return EMPTY_FAVORITES_RESPONSE;
    }
  }
);

export const checkAuthAction = createAsyncThunk<AuthUser & {authorizationStatus: AuthorizationStatus}, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {extra: api}) => {
    try {
      const {data: authUser} = await api.get<AuthUser>(BackendRoute.Login);
      saveToken(authUser.token);
      return {...authUser, authorizationStatus: AuthorizationStatus.Auth};
    } catch {
      return {...EMPTY_AUTH_USER_RESPONSE, authorizationStatus: AuthorizationStatus.NoAuth};
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({email, password}, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data: authData} = await api.post<AuthUser>(BackendRoute.Login, {email, password});
    saveToken(authData.token);

    const {data: offersData} = await api.get<OfferShort[]>(BackendRoute.Offers);
    dispatch(setAuthData({...authData, authorizationStatus: AuthorizationStatus.Auth}));
    dispatch(setOffers(offersData));
    dispatch(setOffersLoadingStatus(true));

    const {data: favorites} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    dispatch(setFavorites(favorites));

    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete<AuthUser>(BackendRoute.Logout);
  }
);

export const fetchOfferDetailDataAction = createAsyncThunk<OfferDetailResponseData, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/fetchDetailData',
  async (offerId, {extra: api}) => {
    try {
      const {data: offerDetail} = await api.get<OfferDetail>(generatePath(BackendRoute.OfferDetail, {id: offerId}));
      const {data: offerComments} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
      const {data: offersNearBy} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
      return {offerDetail, offerComments, offersNearBy};
    } catch {
      return EMPTY_OFFER_DETAIL_RESPONSE;
    }
  }
);

export const addCommentAction = createAsyncThunk<Comment, CommentRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/addComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    try {
      const {data} = await api.post<Comment>(generatePath(BackendRoute.Comments, {id: offerId}), {comment, rating});
      return data;
    } catch {
      return EMPTY_COMMENT_RESPONSE;
    }
  }
);

export const changeOfferFavoriteStatusAction = createAsyncThunk<OfferFavoriteStatusResponseData, OfferFavoriteRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/sendStatus',
  async ({offerId, offerFavoriteStatus}, {extra: api}) => {
    try {
      const {data: currentOffer} = await api.post<OfferDetail>(generatePath(BackendRoute.FavoriteStatus, {id: offerId, status: `${offerFavoriteStatus}`}));
      const {data: favorites} = await api.get<OfferShort[]>(BackendRoute.Favorite);
      return {currentOffer, favorites};
    } catch {
      return EMPTY_OFFER_FAVORITE_STATUS_RESPONSE;
    }
  }
);
