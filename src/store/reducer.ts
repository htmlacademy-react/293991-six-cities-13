import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeFavoritesLoadingStatus, changeOfferCommentSendingStatus, changeOfferCommentsLoadingStatus, changeOfferDetailLoadingStatus, changeOfferFavoriteStatus, changeOffersLoadingStatus, changeOffersNearByLoadingStatus, changeSortType, changeUserEmail, deleteFavorite, deleteFavorites, deleteOfferComments, deleteOfferDetail, deleteOffersNearBy, loadFavorites, loadOfferComments, loadOfferDetail, loadOffers, loadOffersNearBy, requireAuthorization, setError } from './action';
import { City } from '../types/city';
import { OfferDetail, OfferShort } from '../types/offer';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';
import { Comment } from '../types/offer-review';
import { ErrorResponse } from '../types/error-response';
import { addCommentAction, changeOfferFavoriteStatusAction, loginAction } from '../services/api-actions';
import { countFavorities } from '../utils/utils';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
  favoritesCount: number;
  favorites: OfferShort[];
  areFavoritesLoading: boolean;
  sortType: SortType;
  areOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  offerDetail: OfferDetail | null;
  isOfferDetailLoading: boolean;
  offerComments: Comment[];
  areOfferCommentsLoading: boolean;
  isOfferCommentSending: boolean;
  offersNearBy: OfferShort[];
  areOffersNearByLoading: boolean;
  errorResponse: ErrorResponse | null;
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: [],
  favoritesCount: 0,
  favorites: [],
  areFavoritesLoading: true,
  sortType: SortType.Popular,
  areOffersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  offerDetail: null,
  isOfferDetailLoading: true,
  offerComments: [],
  areOfferCommentsLoading: true,
  isOfferCommentSending: false,
  offersNearBy: [],
  areOffersNearByLoading: true,
  errorResponse: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.favoritesCount = countFavorities(state.offers);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(loadOfferDetail, (state, action) => {
      state.offerDetail = action.payload;
    })
    .addCase(changeOfferDetailLoadingStatus, (state, action) => {
      state.isOfferDetailLoading = action.payload;
    })
    .addCase(deleteOfferDetail, (state) => {
      state.offerDetail = null;
      state.isOfferDetailLoading = true;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(changeOfferCommentsLoadingStatus, (state, action) => {
      state.areOfferCommentsLoading = action.payload;
    })
    .addCase(changeOfferCommentSendingStatus, (state, action) => {
      state.isOfferCommentSending = action.payload;
    })
    .addCase(deleteOfferComments, (state) => {
      state.offerComments = [];
      state.areOfferCommentsLoading = true;
    })
    .addCase(loadOffersNearBy, (state, action) => {
      state.offersNearBy = action.payload;
    })
    .addCase(changeOffersNearByLoadingStatus, (state, action) => {
      state.areOffersNearByLoading = action.payload;
    })
    .addCase(deleteOffersNearBy, (state) => {
      state.offersNearBy = [];
      state.areOffersNearByLoading = true;
    })
    .addCase(setError, (state, action) => {
      state.errorResponse = action.payload;
    })
    .addCase(loginAction.fulfilled, (state) => {
      state.errorResponse = null;
    })
    .addCase(addCommentAction.rejected, (state) => {
      state.isOfferCommentSending = false;
    })
    .addCase(changeOfferFavoriteStatus, (state, action) => {
      state.offers = state.offers.map((offer: OfferShort) => ((offer.id === action.payload.id) ? {...offer, isFavorite: action.payload.isFavorite} : offer));
      state.favoritesCount = countFavorities(state.offers);
      if (state.offerDetail !== null && state.offerDetail.id === action.payload.id) {
        state.offerDetail.isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(loadFavorites, (state,  action) => {
      state.favorites = action.payload;
    })
    .addCase(changeFavoritesLoadingStatus, (state, action) => {
      state.areFavoritesLoading = action.payload;
    })
    .addCase(deleteFavorites, (state) => {
      state.favorites = [];
    })
    .addCase(deleteFavorite, (state, action) => {
      state.favorites = [...state.favorites].reduce((accumulator: OfferShort[], curOffer: OfferShort) => (curOffer.id !== action.payload ? [...accumulator, curOffer] : [...accumulator]), []);
    });
});

export {reducer};
