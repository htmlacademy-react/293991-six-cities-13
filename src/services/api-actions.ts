import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferFavoriteRequest, OfferShort } from '../types/offer';
import { BackendRoute } from '../const';
import { AuthRequestData, AuthResponseData } from '../types/auth-data';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';
import { CommentRequestData } from '../types/comment-request-data';
import { setError } from '../store/response-error-process/response-error-process';
import { changeOfferCommentSendingStatus, changeOfferFavoriteStatus, saveOfferComments } from '../store/offer-detail-process/offer-detail-process';

export const fetchOffersAction = createAsyncThunk<OfferShort[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Offers);
    return data
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

export const checkAuthAction = createAsyncThunk<AuthResponseData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/check',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthResponseData>(BackendRoute.Login);
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
    const {data} = await api.post<AuthResponseData>(BackendRoute.Login, {email, password});
    return data;
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

export const fetchOfferDetailDataAction = createAsyncThunk<OfferDetail, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/fetchDetailData',
  async (offerId, {extra: api}) => {
      const {data} = await api.get<OfferDetail>(generatePath(BackendRoute.OfferDetail, {id: offerId}));
      return data
  }
);

export const fetchOfferCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/fetchComments',
  async (offerId, {extra: api}) => {
      const {data} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
      return data
  }
);

export const fetchOfferNearByAction = createAsyncThunk<OfferShort[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/fetchNearBy',
  async (offerId, {extra: api}) => {
      const {data} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
      return data
  }
);

export const addCommentAction = createAsyncThunk<Comment, CommentRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/addComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(changeOfferCommentSendingStatus(true));
    const {data} = await api.post<Comment>(generatePath(BackendRoute.Comments, {id: offerId}), {comment, rating});
    return data;
    // const {data} = await api.get<Comment[]>(generatePath(BackendRoute.Comments, {id: offerId}));
    // dispatch(saveOfferComments(data));
    
    // dispatch(setError(null));
    // dispatch(changeOfferCommentSendingStatus(false));
  }
);

export const changeOfferFavoriteStatusAction = createAsyncThunk<void, OfferFavoriteRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerDetail/sendStatus',
  async ({offerId, offerFavoriteStatus}, {dispatch, extra: api}) => {
    const {data} = await api.post<OfferDetail>(generatePath(BackendRoute.FavoriteStatus, {id: offerId, status: `${offerFavoriteStatus}`}));
    dispatch(changeOfferFavoriteStatus(data));
  }
);
