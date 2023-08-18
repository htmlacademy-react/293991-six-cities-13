import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferFavoriteRequest, OfferShort } from '../types/offer';
import { AppRoute, AuthorizationStatus, BackendRoute, DEFAULT_CITY_NAME } from '../const';
import { changeCity, changeFavoritesLoadingStatus, changeOfferCommentSendingStatus, changeOfferFavoriteStatus, changeOffersLoadingStatus, changeOffersNearByLoadingStatus, changeUserEmail, saveFavorites, saveOfferComments, saveOfferDetail, loadOffers, saveOffersNearBy, redirectToRoute, saveAuthorization, setError, eraseFavoritesAfterLogout } from '../store/action';
import { AuthRequestData, AuthResponseData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { deleteToken, saveToken } from './token';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';
import { CommentRequestData } from '../types/comment-request-data';
import { getCityDataByCityName } from '../utils/utils';

export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Offers);
    dispatch(changeOffersLoadingStatus(true));
    dispatch(loadOffers(data));
    dispatch(changeOffersLoadingStatus(false));
  }
);

export const loadFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetch',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    dispatch(saveFavorites(data));
    dispatch(changeFavoritesLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthResponseData>(BackendRoute.Login);
      dispatch(saveAuthorization(AuthorizationStatus.Auth));
      dispatch(changeUserEmail(data.email));
    } catch {
      dispatch(saveAuthorization(AuthorizationStatus.NoAuth));
      dispatch(changeUserEmail(''));
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
    const {data} = await api.post<UserData>(BackendRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(loadOffersAction());
    dispatch(changeCity(getCityDataByCityName(DEFAULT_CITY_NAME)));
    dispatch(saveAuthorization(AuthorizationStatus.Auth));
    dispatch(changeUserEmail(data.email));
    dispatch(setError(null));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<UserData>(BackendRoute.Logout);
    deleteToken();
    dispatch(saveAuthorization(AuthorizationStatus.NoAuth));
    dispatch(changeUserEmail(''));
    dispatch(setError(null));
    dispatch(eraseFavoritesAfterLogout());
  }
);

export const loadOfferDetailAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetch',
  async (offerId, {dispatch, extra: api}) => {
      const {data: offerDetailData} = await api.get<OfferDetail>(generatePath(BackendRoute.OfferDetail, {id: offerId}));
      dispatch(saveOfferDetail(offerDetailData));

      const {data: offerComemnts} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
      dispatch(saveOfferComments(offerComemnts));

      const {data: offersNearBy} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
      dispatch(saveOffersNearBy(offersNearBy));
  }
);

export const addCommentAction = createAsyncThunk<void, CommentRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'ADD_COMMENT',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(changeOfferCommentSendingStatus(true));
    await api.post(generatePath(BackendRoute.Comments, {id: offerId}), {comment, rating});
    
    const {data} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
    dispatch(saveOfferComments(data));
    
    dispatch(setError(null));
    dispatch(changeOfferCommentSendingStatus(false));
  }
);

export const changeOfferFavoriteStatusAction = createAsyncThunk<void, OfferFavoriteRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/sendStatus',
  async ({offerId, offerFavoriteStatus}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferDetail>(generatePath(BackendRoute.FavoriteStatus, {id: offerId, status: `${offerFavoriteStatus}`}));
    dispatch(changeOfferFavoriteStatus(data));
  }
);
