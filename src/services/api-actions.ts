import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { OfferDetail, OfferShort } from '../types/offer';
import { AppRoute, AuthorizationStatus, BackendRoute } from '../const';
import { changeOfferCommentsLoadingStatus, changeOfferDetailLoadingStatus, changeOffersLoadingStatus, changeOffersNearByLoadingStatus, changeUserEmail, loadOfferComments, loadOfferDetail, loadOffers, loadOffersNearBy, redirectToRoute, requireAuthorization } from '../store/action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken } from './token';
import { Comment } from '../types/offer-review';
import { generatePath } from 'react-router-dom';

export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(BackendRoute.Offers);
    dispatch(changeOffersLoadingStatus(false));
    dispatch(loadOffers(data));
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
      await api.get(BackendRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOGIN',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(BackendRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
    dispatch(changeUserEmail(email));
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
      dispatch(changeOfferDetailLoadingStatus(false));
      dispatch(loadOfferDetail(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
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
    dispatch(changeOfferCommentsLoadingStatus(false));
    dispatch(loadOfferComments(data));
  }
);

export const loadOffersNearByAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFER_COMMENTS',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(generatePath(BackendRoute.OffersNearBy, {id: offerId}));
    dispatch(changeOffersNearByLoadingStatus(false));
    dispatch(loadOffersNearBy(data));
  }
);
