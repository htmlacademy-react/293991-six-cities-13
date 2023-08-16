import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferFavoriteRequest, OfferShort } from '../types/offer';
import { AppRoute, AuthorizationStatus, BackendRoute } from '../const';
import { changeFavoritesLoadingStatus, changeOfferCommentSendingStatus, changeOfferCommentsLoadingStatus, changeOfferDetailLoadingStatus, changeOfferFavoriteStatus, changeOffersLoadingStatus, changeOffersNearByLoadingStatus, changeUserEmail, loadFavorites, loadOfferComments, loadOfferDetail, loadOffers, loadOffersNearBy, redirectToRoute, requireAuthorization, setError } from '../store/action';
import { AuthRequestData, AuthResponseData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { deleteToken, saveToken } from './token';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';
import { CommentRequestData } from '../types/comment-request-data';

export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFERS',
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
  'LOAD_FAVORITIES',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Favorite);
    dispatch(changeFavoritesLoadingStatus(true));
    dispatch(loadFavorites(data));
    // dispatch(changeFavoritesLoadingStatus(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REQUIRE_AUTHORIZATION',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthResponseData>(BackendRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(changeUserEmail(data.email));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(changeUserEmail(''));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(BackendRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
  'LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<UserData>(BackendRoute.Logout);
    deleteToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(changeUserEmail(''));
    dispatch(setError(null));
  }
);

export const loadOfferDetailAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFER_DETAIL',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferDetail>(generatePath(BackendRoute.OfferDetail, {id: offerId}));
      dispatch(changeOfferDetailLoadingStatus(true));
      dispatch(loadOfferDetail(data));
      dispatch(changeOfferDetailLoadingStatus(false));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(changeOfferDetailLoadingStatus(false));
    }
  }
);

export const loadOfferCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFER_COMMENTS',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
    dispatch(changeOfferCommentsLoadingStatus(true));
    dispatch(loadOfferComments(data));
    dispatch(changeOfferCommentsLoadingStatus(false));
  }
);

export const loadOffersNearByAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFERS_NEARBY',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
    dispatch(changeOffersNearByLoadingStatus(true));
    dispatch(loadOffersNearBy(data));
    dispatch(changeOffersNearByLoadingStatus(false));
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
    dispatch(loadOfferCommentsAction(offerId));
    dispatch(setError(null));
    dispatch(changeOfferCommentSendingStatus(false));
  }
);

export const changeOfferFavoriteStatusAction = createAsyncThunk<void, OfferFavoriteRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CHANGE_OFFER_FAVORITE_STATUS',
  async ({offerId, offerFavoriteStatus}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferDetail>(generatePath(BackendRoute.FavoriteStatus, {id: offerId, status: `${offerFavoriteStatus}`}));
    dispatch(changeOfferFavoriteStatus(data));
  }
);
