import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeFavoritesLoadingStatus, changeOfferCommentSendingStatus, changeOfferDetailLoadingStatus, changeOfferFavoriteStatus, changeOffersLoadingStatus, changeSortType, changeUserEmail, deleteFavorite, deleteFavorites, deleteOfferDetail, eraseFavoritesAfterLogout, saveFavorites, saveOfferComments, saveOfferDetail, loadOffers, saveOffersNearBy, saveAuthorization, setError, setHoveredOffer } from './action';
import { City } from '../types/city';
import { OfferDetail, OfferShort } from '../types/offer';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';
import { Comment } from '../types/offer-review';
import { ErrorResponse } from '../types/error-response';
import { addCommentAction, loadOfferDetailAction, loginAction } from '../services/api-actions';
import { getFavoritiesCount, eraseOfferFavoriteStatus, filterNearByOffers, getOffersByCity, updateOfferFavoriteStatus } from '../utils/utils';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
  offersByCity: OfferShort[];
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
  isOfferCommentSending: boolean;
  offersNearBy: OfferShort[];
  errorResponse: ErrorResponse | null;
  hoveredOffer: OfferShort | null | undefined;
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offersByCity: [],
  favoritesCount: 0,
  favorites: [],
  areFavoritesLoading: true,
  sortType: SortType.Popular,
  areOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  offerDetail: null,
  isOfferDetailLoading: true,
  offerComments: [],
  isOfferCommentSending: false,
  offersNearBy: [],
  errorResponse: null,
  hoveredOffer: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity<OfferShort>(state.offers, action.payload.name);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.favoritesCount = getFavoritiesCount(state.offers);
      state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(saveAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(saveOfferDetail, (state, action) => {
      state.offerDetail = action.payload;
      state.isOfferDetailLoading = true;
    })
    .addCase(changeOfferDetailLoadingStatus, (state, action) => {
      state.isOfferDetailLoading = action.payload;
    })
    .addCase(deleteOfferDetail, (state) => {
      state.offerDetail = null;
      state.offerComments = [];
      state.offersNearBy = [];
      state.isOfferDetailLoading = true;
    })
    .addCase(saveOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(changeOfferCommentSendingStatus, (state, action) => {
      state.isOfferCommentSending = action.payload;
    })
    .addCase(saveOffersNearBy, (state, action) => {
      state.offersNearBy = filterNearByOffers(action.payload);
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
      state.offers = updateOfferFavoriteStatus(state.offers, action.payload.id, action.payload.isFavorite);
      state.offersByCity = updateOfferFavoriteStatus(state.offersByCity, action.payload.id, action.payload.isFavorite);
      state.offersNearBy = updateOfferFavoriteStatus(state.offersNearBy, action.payload.id, action.payload.isFavorite);
      state.favoritesCount = getFavoritiesCount(state.offers);
      if (state.offerDetail !== null && state.offerDetail.id === action.payload.id) {
        state.offerDetail.isFavorite = action.payload.isFavorite;
      }
    })
    .addCase(saveFavorites, (state, action) => {
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
    })
    .addCase(eraseFavoritesAfterLogout, (state) => {
      state.offers = eraseOfferFavoriteStatus(state.offers);
      state.offersByCity = eraseOfferFavoriteStatus(state.offersByCity);
      state.favoritesCount = 0;
      if (state.offerDetail !== null) {
        state.offerDetail.isFavorite = false;
      }
    })
    .addCase(loadOfferDetailAction.fulfilled, (state) => {
      state.isOfferDetailLoading = false;
    })
    .addCase(loadOfferDetailAction.rejected, (state) => {
      state.isOfferDetailLoading = false;
    })
    .addCase(setHoveredOffer, (state, action) => {
      state.hoveredOffer = action.payload;
    });
});

export {reducer};
