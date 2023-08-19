import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { OfferShort } from '../../types/offer';
import { store } from '..';
import { eraseOfferFavoriteStatus, getFavoritiesCount } from '../../utils/utils';
import { fetchFavoritesAction, fetchOffersAction, logoutAction } from '../../services/api-actions';


const initialState: FavoriteProcess = {
  favoritesCount: 0,
  favorites: [],
  areFavoritesLoading: true,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    saveFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeFavoritesLoadingStatus: (state, action) => {
      state.areFavoritesLoading = action.payload;
    },
    deleteFavorites: (state) => {
      state.favorites = [];
    },
    deleteFavorite: (state, action) => {
      state.favorites = [...state.favorites].reduce((accumulator: OfferShort[], curOffer: OfferShort) => (curOffer.id !== action.payload ? [...accumulator, curOffer] : [...accumulator]), []);
    },
    eraseFavoritesAfterLogout: (state) => {
      // const wholeState = store.getState();
      
      // wholeState.OFFERS
      
      // wholeState.OFFERS.offersByCity = eraseOfferFavoriteStatus(wholeState.OFFERS.offersByCity);
      // state.favoritesCount = 0;
      // if (wholeState.OFFER_DETAIL.offerDetail !== null) {
      //   wholeState.OFFER_DETAIL.offerDetail.isFavorite = false;
      // }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.areFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoritesCount = action.payload.length;
        state.favorites = action.payload
        state.areFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.areFavoritesLoading = false;
      })
      .addCase(logoutAction.pending, (state) => {
        state.favoritesCount = 0;
        state.favorites = [];
      })
  }
});

export const { saveFavorites, changeFavoritesLoadingStatus, deleteFavorites, deleteFavorite, eraseFavoritesAfterLogout } = favoriteProcess.actions;
